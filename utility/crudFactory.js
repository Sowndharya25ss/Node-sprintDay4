/** Factory Functions */
function getAllFactory(ElementModel) {
  return async function (req, res) {
    try {
      const dataStore = await ElementModel.find();
      if (dataStore.length == 0) {
        throw new Error("No Data");
      }
      res.status(200).json({
        status: "success",
        message: dataStore,
      });
    } catch (err) {
      res.status(200).json({
        status: "failure",
        message: err.message,
      });
    }
  };
}
function getByIdFactory(ElementModel) {
  return async function (req, res) {
    try {
      const id = req.params.id;
      const details = await ElementModel.findById(id);
      res.status(200).json({
        status: "success",
        message: details,
      });
    } catch (err) {
      const id = req.params.id;
      res.status(404).json({
        status: "failure",
        message: `No Data with this id ${id}`,
      });
    }
  };
}
function checklistToPostFactory(ElementModel) {
  return function (req, res, next) {
    // checklist if we are sending the empty data or not to post method
    const details = req.body;
    const isEmpty = Object.keys(details).length == 0;
    if (isEmpty) {
      res.status(404).json({
        status: "failure",
        message: "Please provide details to add",
      });
    } else {
      next();
    }
  };
}
function toCreateFactory(ElementModel) {
  return async function (req, res) {
    try {
      const details = req.body;
      const data = await ElementModel.create(details);
      res.status(200).json({
        status: "success",
        created: data,
      });
    } catch (err) {
      res.status(404).json({
        status: "failure",
        error: err.message,
      });
    }
  };
}
function toDeleteFactory(ElementModel) {
  return async function (req, res) {
    const { id } = req.params;
    try {
      const data = await ElementModel.findByIdAndDelete(id);
      res.status(200).json({
        status: "successful deletion",
        deleted: data,
      });
    } catch (err) {
      res.status(200).json({
        status: "failure",
        message: err.message,
      });
    }
  };
}

module.exports = {getAllFactory, getByIdFactory, checklistToPostFactory, toCreateFactory, toDeleteFactory}