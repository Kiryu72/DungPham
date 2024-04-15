const fs = require('fs');
const express = require('express');
const app = express();

var HEADER = {
    headers: { VSDung: 'header' },
  }

app.use(express.json());

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);



const getAllTours = (req, res) => {
    res
    .status(200)
    .json({
        status: 'success',
        author: 'VS Dung',
        data: {
            tours
        }
    });
}

const getTour = (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);

    //if(id > tours.length){
    if(!tour){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    });
}



const createTour = (req, res) => {  
    const newID = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id: newID}, req.body);

    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours),
    err => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        });
    }
    );
}

const updateTour = (req, res) => {
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
var abc = 
    {
        "id": req.body.id,
        "name": req.body.name,
        "duration": req.body.duration,
        "maxGroupSize": req.body.maxGroupSize,
        "difficulty": req.body.difficulty
    }

    const newTour = Object.assign( abc);

    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours),
    err => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        });
    }
    );
    
    // res.status(200).json({
    //     status: 'success',
    //     data: {
    //         tour: 'Update success'
    //     }
    // });
}

const deleteTour = (req, res) => {
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
}

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id?', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours').get(getAllTours).post(createTour);
app.route('/api/v1/tours/:id?').get(getTour).patch(updateTour).delete(deleteTour);



const port = 2700;
app.listen(port,'192.168.1.14', () => {
    console.log(`Ung dung dang chay tren cong ${port}...`);
});