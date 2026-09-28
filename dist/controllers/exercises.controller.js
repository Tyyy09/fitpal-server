"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// express imports
const express_1 = __importDefault(require("express"));
// create router to map url requests to correct methods
const router = express_1.default.Router();
;
let exercises = [
    { id: 1, name: 'Squats' },
    { id: 2, name: 'Rope Jumping' },
    { id: 3, name: 'Jogging' },
    { id: 4, name: 'Volleyball' }
];
/* GET: /api/v1/exercises => fetch all exercises */
router.get('/', (req, res) => {
    return res.status(200).json(exercises);
});
/* POST: /api/v1/exercises => create new exercise */
router.post('/', (req, res) => {
    // validate request body
    if (!req.body) {
        return res.status(400).json({ err: 'Invalid Request Body' });
    }
    // add new exercise to array from request body
    exercises.push(req.body);
    // send response back
    return res.status(201).json(); // 201: resource created
});
//put: /api/v1/exercises/4 => update exercise base on id
router.put('/:id', (req, res) => {
    //search array for id in url param
    const index = exercises.findIndex(e => e.id.toString() === req.params.id);
    if (index === -1) {
        return res.status(404).json({ json: 'Exercise not found' });
    }
    // update exercise in array with new data from request body
    exercises[index] = req.body;
    return res.status(204).json({ msg: 'Exercise updated' }); // 204: no content
});
//delete : /api/v1/exercises/id => delete exercise base on id
router.delete('/:id', (req, res) => {
    //search array for id in url param
    const index = exercises.findIndex(e => e.id.toString() === req.params.id);
    if (index === -1) {
        return res.status(404).json({ json: 'Exercise not found' });
    }
    // remove exercise from array
    // splice(index, 1) => remove 1 element from array at index
    exercises.splice(index, 1);
    return res.status(204).json({ msg: 'Exercise deleted' }); // 204: no content
});
// make router public so other files can access it
module.exports = router;
