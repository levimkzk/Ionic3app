import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,FabContainer } from 'ionic-angular';
import { Media, MediaObject } from '@ionic-native/media';
import { FileTransfer, FileUploadOptions, FileTransferObject, FileUploadResult } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

/**
 * Generated class for the VoicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-voice',
  templateUrl: 'voice.html',
})
export class VoicePage {

  content: string;
  public filePath : any;
  public recordData : any;
  showRecordStatus: any;
  fab: any;
  color: string = "danger";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private media: Media,
    private file: File,
    public ft: FileTransfer,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VoicePage');
  }

    // 设置上传参数

  pressEvent(e) {

    this.color = "secondary";
    //创建media对象，参数文件名字，上面的filePath也指定了文件存放位置和文件名字
    this.recordData = this.media.create('file.wav');

    //开始录音
    this.recordData.startRecord();
    // 监测录音状态的回调
    //mediaObj.onStatusUpdate.subscribe(status => this.showRecordStatus(status));
    console.log('start');
  }
  pressupEvent(e){
    this.color = "danger";
    this.recordData.stopRecord();
    console.log('end');
  }
  save(){
    localStorage.setItem('media',this.filePath);
  }
  submit(){
    let options: FileUploadOptions = {
      fileKey: "file",
      fileName: "file.wav",
      mimeType: "audio/wav"
    };

    const ftObj: FileTransferObject = this.ft.create();
    ftObj.upload(this.file.externalDataDirectory + 'file.wav',
        encodeURI(""),options).then(
        (data) => {
            alert("上传成功!");
        },
        (err) => {
            alert("上传失败" + err.code);
        });
  }
  play(){
    this.recordData.play();
    console.log('playing');
  }
}
