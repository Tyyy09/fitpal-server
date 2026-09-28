// express imports
import express, { Request, Response, Router } from "express";

// create router to map url requests to correct methods
const router: Router = express.Router();

// mock data for CRUD
interface Exercise {
    id: number,
    name: string
};

let exercises = [
    { id: 1, name: 'Squats' },
    { id: 2, name: 'Push-ups' },
    { id: 3, name: 'Jogging' },
    { id: 4, name: 'Volleyball' }
];

/* GET: /api/v1/exercises => fetch all exercises */
router.get('/', (req: Request, res: Response) => {
    return res.status(200).json(exercises);
});

/* POST: /api/v1/exercises => create new exercise */
router.post('/', (req: Request,  res: Response) => {
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
router.put('/:id', (req: Request, res: Response) => {
    //search array for id in url param
    const index: number = exercises.findIndex(e => e.id.toString() === req.params.id);

    if (index === -1){
        return res.status(404).json({json: 'Exercise not found'});
    }
    // update exercise in array with new data from request body

    exercises[index] = req.body;
    return res.status(204).json({ msg: 'Exercise updated' }); // 204: no content
});

//delete : /api/v1/exercises/id => delete exercise base on id
router.delete('/:id', (req: Request, res: Response) => {
    //search array for id in url param
    const index: number = exercises.findIndex(e => e.id.toString() === req.params.id);

    if (index === -1){
        return res.status(404).json({json: 'Exercise not found'});
    }
    // remove exercise from array
    exercises.splice(index, 1);
    return res.status(204).json({ msg: 'Exercise deleted' }); // 204: no content
});

// make router public so other files can access it
module.exports = router;