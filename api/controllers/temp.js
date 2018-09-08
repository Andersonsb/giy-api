exports.clients_create_client = async (req, res, next) => {
  try {
    client = await Client.find({ email: req.body.email });
    if (client.length >= 1) {
      return res.status(409).json({
        message: "Client email already exists"
      });
    }
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({
          error: err
        });
      }
      const client = new Client({
        _id: new mongoose.Types.ObjectId(),
        active: true,
        address: req.body.address,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone,
        email: req.body.email,
        namespace: req.body.namespace,
        password: hash,
        created: Date.now()
      });

      result = await client.save();
      console.log(result);
      res.status(201).json({
        message: "Client Created"
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err
    });
  }
};

exports.user_delete_user = async (req, res, next) => {
  try {
    result = await User.findById(req.params.userId);

    if (!result) {
      return res.status(404).json({
        message: "User not found with specified ID"
      });
    } else {
      await User.deleteOne({ _id: req.params.userId });
      res.status(200).json({
        message: "User deleted"
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err
    });
  }
};
