const request = require("request");
var should = require("chai").should();
let id;
const FILE_NAME = "New_file.txt";
const TOKEN = 'unzCncpAnVUAAAAAAAAAAZorckdLWfmY9_VgXfENpXxPZ-onP5Rp-_TbmyhdTsBI';
const Method = 'POST';

//help function
function insert(str, index, value) {
    return str.substr(0, index) + value + str.substr(index);
}

//Builder
let Options = function(method, url, body, headers) {
    this.method = method;
    this.url = url;
    this.body = body;
    this.headers = headers;
}

let OptionsBuilder = function () {
    let method;
    let url;
    let body;
    let headers;

    return {
        set_method : function (method) {
            this.method = method;
            return this;
        },
        set_url : function (url) {
            this.url = url;
            return this;
        },
        set_body : function (body) {
            this.body = body;
            return this;
        },
        set_headers : function (headers) {
            this.headers = headers;
            return this;
        },
        build: function () {
            return new Options(method, url, body, headers);
        }
    };
};

//UPLOAD
const upload_url = 'https://content.dropboxapi.com/2/files/upload';
const Dropbox_API_Arg_patern = '{"path": "/","mode": "add","autorename": true,"mute": false,"strict_conflict": false}';
const upload_body = '{\n    "path": "",\n    "mode": "add",\n    "autorename": true,\n    "mute": false,\n    "strict_conflict": false\n}';
const upload_headers =  {
    'Dropbox-API-Arg': insert(Dropbox_API_Arg_patern, 11, FILE_NAME),
    'Content-Type': 'application/octet-stream',
    'Authorization': 'Bearer '+TOKEN
};

//Initializing
let upload_req = new OptionsBuilder().set_method(Method).set_url(upload_url).set_body(upload_body).set_headers(upload_headers);
//Creating dict of options for request
let options_upload = {'method': upload_req.method, 'url': upload_req.url, 'headers': upload_req.headers, body: upload_req.body};


//GETMETADATA
const get_url = 'https://api.dropboxapi.com/2/sharing/get_file_metadata';
const get_body = JSON.stringify({
    "file": id,
    "actions": []
});
const get_headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+TOKEN
};
//Initializing
let get_req = new OptionsBuilder().set_method(Method).set_url(get_url).set_body(get_body).set_headers(get_headers);
//Creating dict of options for request
let options_get = {'method': get_req.method, 'url': get_req.url, 'headers': get_req.headers, body: get_req.body};


//DELETE
const del_url = 'https://api.dropboxapi.com/2/files/delete_v2';
const del_body = JSON.stringify({
    "path": "/"+FILE_NAME
});
const del_headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+TOKEN}
//Initializing
let del_req = new OptionsBuilder().set_method(Method).set_url(del_url).set_body(del_body).set_headers(del_headers);
//Creating dict of options for request
let options_del = {'method': del_req.method, 'url': del_req.url, 'headers': del_req.headers, body: del_req.body};


describe('Test', () => {
    it('Upload', (done) => {
        request(options_upload, function (error, response) {
            if (error) throw new Error(error);
            id = JSON.parse(response.body).id;
            JSON.parse(response.body).name.should.equal(FILE_NAME);
            done();
        });
    });
    it('GetFileMetadata', (done) => {
        options_get['body'] = JSON.stringify({
            "file": id,
            "actions": []
        });
        request(options_get, function (error, response) {
            if (error) throw new Error(error);
            JSON.parse(response.body).name.should.equal(FILE_NAME);
            done();
        });
    });
    it('Delete', (done) => {
        request(options_del, function (error, response) {
            if (error) throw new Error(error);
            // console.log(JSON.parse(response.body)..name);
            JSON.parse(response.body).metadata.name.should.equal(FILE_NAME);
            done();
        });
    });
});
