const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

const state = {
  user: {
    username: 'demo@bank.com',
    password: 'password123',
  },
  accounts: [
    { id: 'CHK-1001', name: 'Checking', balance: 2450.75 },
    { id: 'SAV-2001', name: 'Savings', balance: 12800.25 },
    { id: 'CC-3001', name: 'Credit Card', balance: -220.5 },
  ],
};

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
};

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(payload));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';

    req.on('data', (chunk) => {
      data += chunk;
      if (data.length > 1e6) {
        req.destroy();
        reject(new Error('Request body too large'));
      }
    });

    req.on('end', () => {
      if (!data) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(data));
      } catch (error) {
        reject(new Error('Invalid JSON payload'));
      }
    });

    req.on('error', reject);
  });
}

function serveStatic(req, res) {
  const requestPath = req.url === '/' ? '/index.html' : req.url;
  const safePath = path.normalize(requestPath).replace(/^\/+/, '');
  const filePath = path.join(PUBLIC_DIR, safePath);

  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    res.end(content);
  });
}

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === 'GET' && req.url === '/api/health') {
      sendJson(res, 200, { ok: true, service: 'banking-demo' });
      return;
    }

    if (req.method === 'POST' && req.url === '/api/login') {
      const { username, password } = await parseBody(req);
      const isValidUser = username === state.user.username && password === state.user.password;

      if (!isValidUser) {
        sendJson(res, 401, { success: false, message: 'Invalid username or password' });
        return;
      }

      sendJson(res, 200, { success: true, username: state.user.username });
      return;
    }

    if (req.method === 'GET' && req.url === '/api/accounts') {
      sendJson(res, 200, { accounts: state.accounts });
      return;
    }

    if (req.method === 'POST' && req.url === '/api/transfer') {
      const { fromAccountId, recipient, amount } = await parseBody(req);
      const transferAmount = Number(amount);

      if (!recipient || !recipient.trim() || !Number.isFinite(transferAmount) || transferAmount <= 0) {
        sendJson(res, 400, { success: false, message: 'Please enter a valid recipient name and transfer amount' });
        return;
      }

      const account = state.accounts.find((item) => item.id === fromAccountId);
      if (!account) {
        sendJson(res, 400, { success: false, message: 'Selected account not found' });
        return;
      }

      if (account.balance < transferAmount) {
        sendJson(res, 400, { success: false, message: 'Insufficient funds for this transfer' });
        return;
      }

      account.balance = Number((account.balance - transferAmount).toFixed(2));

      sendJson(res, 200, {
        success: true,
        message: `Transfer of $${transferAmount.toFixed(2)} to ${recipient.trim()} was successful`,
        account,
      });
      return;
    }

    serveStatic(req, res);
  } catch (error) {
    sendJson(res, 500, { success: false, message: error.message || 'Server error' });
  }
});

server.listen(PORT, () => {
  console.log(`Banking demo app running at http://127.0.0.1:${PORT}`);
});
