import mongoose from "mongoose";
import "dotenv/config";

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

console.log("connecting to", url);

mongoose
  .connect(url)

  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 15,
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^\(?\d{2,3}[\)]?[- ]?\d{6,7}$/.test(value);
      },
      message: "Phone number must be in the format 09-1234556 or 040-22334455",
    },
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Person = mongoose.model("Person", personSchema);
export default Person;
