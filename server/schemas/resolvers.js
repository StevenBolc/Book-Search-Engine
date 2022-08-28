const { Book, User } = require('../models');
const { signToken } = require('../utils/auth');
const resolvers = {
  Query: {
    getSingleUser((user = null, params)){
      const foundUser = await User.findOne({
        $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
      })
    },
  book: async () => {
    return Book.find({});
  },
    books: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return Book.find(params);
    },


  },
Mutation: {
  createUser: ({ body }, res) => {
    const user = await User.create(body);

    if (!user) {
      return res.status(400).json({ message: 'Something is wrong!' });
    }
    const token = signToken(user);
    res.json({ token, user });
  },
    login: ({ body }, res) => {
      const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });
      if (!user) {
        return res.status(400).json({ message: "Can't find this user" });
      }

      const correctPw = await user.isCorrectPassword(body.password);

      if (!correctPw) {
        return res.status(400).json({ message: 'Wrong password!' });
      }
      const token = signToken(user);
      res.json({ token, user });
    },

      saveBook: ({ user, body }, res) => {
        console.log(user);
        try {
          const updatedUser = await User.findOneAndUpdate(
            { _id: user._id },
            { $addToSet: { savedBooks: body } },
            { new: true, runValidators: true }
          );
          return res.json(updatedUser);
        } catch (err) {
          console.log(err);
          return res.status(400).json(err);
        }
      },
        deleteBook: ({ user, params }, res) => {
          const updatedUser = await User.findOneAndUpdate(
            { _id: user._id },
            { $pull: { savedBooks: { bookId: params.bookId } } },
            { new: true }
          );
          if (!updatedUser) {
            return res.status(404).json({ message: "Couldn't find user with this id!" });
          }
          return res.json(updatedUser);
        },
  },
};

module.exports = resolvers;
