const express = require('express');
app = express();
app.use(express.static('public'));
app.use(express.json({limit: '10mb'}));

app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'));
app.get('/admin', (req, res) => res.sendFile(__dirname + '/public/admin.html'));

// API Routes
app.post('/api/login', (req, res) => {
  const {email, password} = req.body;
  const users = {
    'admin@isdtt.com': {pass: 'admin123', role: 'admin'},
    'coach@isdtt.com': {pass: 'coach123', role: 'coach'},
    'parent@isdtt.com': {pass: 'parent123', role: 'parent'}
  };
  const user = users[email];
  if (user && user.pass === password) {
    res.json({success: true, user: {email, role: user.role}, token: 'demo'});
  } else {
    res.status(401).json({error: 'Invalid login'});
  }
});

app.post('/api/academy/request', (req, res) => {
  const {child_name, age_group} = req.body;
  res.json({
    success: true,
    id: 'req-'+Date.now(),
    message: `✅ ${child_name} (${age_group}) registered!\nCoach will assign in 1-2 days`
  });
});

app.post('/api/academy/assign', (req, res) => {
  res.json({success: true, message: '✅ Assigned! Parent notified via WhatsApp/Email'});
});

app.post('/api/booking', (req, res) => {
  const {product, payment_type} = req.body;
  const price = product.includes('Private') ? 400 : product.includes('Table') ? 100 : 75;
  res.json({
    success: true,
    id: 'book-'+Date.now(),
    message: payment_type === 'online' ? 
      `✅ Paid ${price}AED online! Receipt sent` : 
      `✅ Confirmed! Pay: isdtt.com/pay/${Date.now()} or show at reception`
  });
});

app.get('/api/stats', (req, res) => {
  res.json({
    stats: {
      total_bookings: 23,
      paid_online: 15,
      pay_later: 8,
      academy_requests: 12,
      revenue: '9,200 AED'
    }
  });
});

module.exports = app;
