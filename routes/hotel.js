var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myhotel', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', function () {
    console.log("database terconnect");
});

const Hotel = mongoose.model('infohotel', {
    nama: String,
    alamat: String,
    lokasi: String
});

router.get('/', function (req, res, next) {
    Hotel.find((err, resData) => {
        console.log(resData);
        let data = {
            layout: 'admin',
            tittle: 'Informasi Hotel...',
            infohotel: resData
        };
        res.render('hotel/lihat', data);
    });
});

router.get('/ubah/:id', function (req, res, next) {
    Hotel.findById(req.params.id, (err, resData) => {
        let data = {
            layout: 'admin',
            tittle: 'info Hotel',
            infohotel: resData
        };
        res.render('hotel/ubah', data);
    });
});

router.post('/:id/update', function (req, res, next) {
    let datahotel = req.body;
    Hotel.findById(req.params.id, function (err, resData) {
        if (!resData) {
            res.status(404).send("data tidak ditemukan!");
        } else {
            resData.nama = datahotel.nama;
            resData.alamat = datahotel.alamat;
            resData.lokasi = datahotel.lokasi;
            resData.save().then(resData => {
                res.redirect('/admin/hotel');
            })
        }
    });
});

router.get('/:id/delete', function (req, res, next) {
    Hotel.findById(req.params.id, function (err, resData) {
        if (!resData) {
            res.status(404).send("data tidak ditemukan!");
        } else {
            resData.delete().then(resData => {
                res.redirect('/admin/hotel');
            })
        }
    });
});

router.get('/tambah', function (req, res, next) {

    let data = {
        layout: 'admin',
        title: 'From Tambah'
    };
    res.render('hotel/tambah', data);
});

router.post('/tambah', function (req, res, next) {
    let datahotel = req.body;
    let hotel = new Hotel(datahotel);
    hotel.save().then(resData => {
        res.redirect('/admin/hotel');
    }).catch(err => {
        res.status(400).send('Simpan kelas gagal!');
    });
});

module.exports = router;