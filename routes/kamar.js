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

const Kamar = mongoose.model('infokamar', {
    no: String,
    jumlah: String,
    fasilitas: [String],
    harga: String
});

router.get('/', function (req, res, next) {
    Kamar.find((err, resData) => {
        let data = {
            layout: 'admin',
            title: 'List Kamar',
            infokamar: resData
        };
        res.render('kamar/list', data);
    });
});

router.get('/edit/:id', function (req, res, next) {
    Kamar.findById(req.params.id, (err, resData) => {
        let data = {
            layout: 'admin',
            title: 'info kamar',
            infokamar: resData
        };
        res.render('kamar/edit', data);
    });
});

router.post('/:id/update', function (req, res, next) {
    let datakamar = req.body;
    Kamar.findById(req.params.id, function (err, resData) {
        if (!resData) {
            res.status(404).send("data tidak ditemukan!");
        } else {
            resData.no = datakamar.no;
            resData.jumlah = datakamar.jumlah;
            resData.fasilitas = datakamar.fasilitas;
            resData.harga = datakamar.harga;
            resData.save().then(resData => {
                res.redirect('/admin/kamar');
            })
        }
    });
});

router.get('admin/:id/delete', function (req, res, next) {
    Kamar.findById(req.params.id, function (err, resData) {
        if (!resData) {
            res.status(404).send("data tidak ditemukan!");
        } else {
            resData.delete().then(resData => {
                res.redirect('/admin/kamar');
            })
        }
    });
});

router.get('/add', function (req, res, next) {

    let data = {
        layout: 'admin',
        title: 'Tambah Kamar',
        content: 'Halaman Kamar'
    };
    res.render('kamar/add', data);
});

router.post('/add', function (req, res, next) {
    let datakamar = req.body;
    let kamar = new Kamar(datakamar);
    kamar.save().then(resData => {
        res.redirect('/admin/kamar');
    }).catch(err => {
        res.status(400).send('Simpan kamar gagal!');
    });
});

module.exports = router;