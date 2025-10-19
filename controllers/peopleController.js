const Person = require('../models/personModel')

const getPeople = async (req, res) => {
    try {
        const person = await Person.findAll()
        res.status(200).send({ people: person, success: true })
    }
    catch (err) {
        res.status(500).send({ msg: 'server error' })
    }

}
const getPeopleById = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id)
        const person = await Person.findByPk(id);
        res.status(200).send({ people: person, success: true });

        if (!person) {
            return res.status(404).json({ success: false, msg: "Person not found" });
        }

    } catch (error) {
        console.error("Error fetching person by ID:", error);
        res.status(500).send({ msg: 'server error' });

    }

}

const createPeople = async (req, res) => {

    const { firstName, lastName, phone, email, dateOfBirth,
        bloodGroup, address, notes, createdBy } = req.body;
    const avatarPath = req.file ? req.file.filename : null
    try {

        const newPerson = await Person.create({
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            email: email,
            dateOfBirth: dateOfBirth,
            bloodGroup: bloodGroup,
            address: address,
            notes: notes,
            createdBy: createdBy,
            avatarPath: avatarPath

        });
        if (newPerson) {
            res.status(200).send({ msg: "Person created successfully", success: true });
        } else {
            res.status(500).send({ msg: "Error with creating Person", success: false })
        }
    } catch (error) {
        console.error("Person creation error:", error);
        res.status(500).send({ msg: "Server error", success: false });
    }

}

const updatePeople = async (req, res) => {
  const id = req.params.id;
  const {
    firstName,
    lastName,
    phone,
    email,
    dateOfBirth,
    bloodGroup,
    address,
    notes,
    createdBy,
  } = req.body;

  const avatarPath = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const person = await Person.findByPk(id);

    if (!person) {
      return res
        .status(404)
        .send({ msg: "Person not found", success: false }); // ✅ Added return
    }

    // ✅ Update only provided fields
    if (firstName !== undefined) person.firstName = firstName;
    if (lastName !== undefined) person.lastName = lastName;
    if (phone !== undefined) person.phone = phone;
    if (email !== undefined) person.email = email;
    if (avatarPath) person.avatarPath = avatarPath;
    if (dateOfBirth !== undefined) person.dateOfBirth = dateOfBirth;
    if (bloodGroup !== undefined) person.bloodGroup = bloodGroup;
    if (address !== undefined) person.address = address;
    if (notes !== undefined) person.notes = notes;
    if (createdBy !== undefined) person.createdBy = createdBy;

    await person.save();

    res
      .status(200)
      .send({ msg: "Person updated successfully", success: true, person });
  } catch (error) {
    console.error("Update person Error:", error);
    res
      .status(500)
      .send({ msg: "Server error", error: error.message, success: false });
  }
};


const deletePeople = async (req, res) => {
    const id = req.params.id;
    try {
        const deleted = await Person.destroy({ where: { id } });
        if (deleted) {
            res.status(200).send({ msg: "Person deleted Successfully", success: true });
        } else {
            res.status(404).send({ msg: "Person not found", success: false });
        }
    } catch (error) {
        console.error("Delete Person Error:", error);
        res.status(500).send({ msg: "Server error", error: error.message });
    }

}

module.exports = {
    getPeople,
    getPeopleById,
    createPeople,
    updatePeople,
    deletePeople

}