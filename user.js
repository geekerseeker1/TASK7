const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


app.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
});


app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

   
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    
    const token = jwt.sign({ userId: user._id, role: user.role }, 'secretKey');

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Failed to login' });
  }
});


app.get('/profile', (req, res) => {

  const userId = req.headers['user-id'] || req.user.userId;

 
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({ user });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to fetch user profile' });
    });
});
