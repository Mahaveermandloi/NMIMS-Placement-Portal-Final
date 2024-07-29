

const passwordSchema = new mongoose.Schema({
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true
    },
    password: {
      type: String,
      required: true
    }
  }, {
    timestamps: true
  });
  
  const Password = mongoose.model('Password', passwordSchema);
  
  module.exports = Password;
  