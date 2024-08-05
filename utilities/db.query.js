let mongoose = require("mongoose");
let controller = {};

controller.findByQuery = (model, query, limit, skip, sort) => {
    try {
        let queryObj = query || {};
        let sortObj = sort || { _id:-1 };
        let limitVal = limit || 10000;
        let skipVal = skip || 0;
        return model
            .find(queryObj)
            .skip(skipVal)
            .limit(limitVal)
            .sort(sortObj)
    } catch (error) {
        return error;
    }
};

controller.findOne = (model, query, sort, skip) => {
    try {
        let queryObj = query || {};
        let sortObj = sort || { _id:-1 };
        let skipVal = skip || 0;
        return model
            .findOne(queryObj)
            .skip(skipVal)
            .sort(sortObj)
    } catch (error) {
        console.log(error);
    }
};

controller.createOne = (model, document) => {
    try {
        return model.create(document);
    } catch (error) {
        console.log(error);
    }
};

controller.findByIdAndUpdate = (model, docId, updateObj) => {
    try {
        return model.findByIdAndUpdate({ _id: new mongoose.Types.ObjectId(docId) }, { $set: updateObj });
    } catch (error) {
        console.log(error);
    }
};

controller.findOneAndUpdate = (model, query, updateObj, options) => {
    try {
        let opt = options || {};
        return model.findOneAndUpdate(query, { $set: updateObj }, opt);
    } catch (error) {
        console.log(error);
    }
};

controller.findOneAndUpdateWithQuery = (model, query, updateObjWithQuery) => {
    try {
        return model.findOneAndUpdate(query, updateObjWithQuery);
    } catch (error) {
        console.log(error);
    }
}


controller.createMany = (model, docArray) => {
    try {
        return model.insertMany(docArray);
    } catch (error) {
        console.log(error);
    }
};

controller.deleteOne = (model, query) => {
    try {
        return model.deleteOne(query);
    } catch (error) {
        console.log(error);
    }
};


module.exports = controller;
