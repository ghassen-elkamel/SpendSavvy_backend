import { Injectable, BadRequestException } from '@nestjs/common';
import * as mkdirp from 'mkdirp';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as puppeteer from 'puppeteer'

@Injectable()
export class FileUploadService {
  async upload(type: string, file: any): Promise<string> {
    const directoryPath = path.join(__dirname, '../../../public/', type, '/');
    const url = type + '/';

    mkdirp.sync(directoryPath);
    const fileSplit = file.originalname.split('.');
    const extension = fileSplit[fileSplit.length - 1];
    const name = uuidv4();
    const filePath = directoryPath + name + '.' + extension;
    fs.writeFile(filePath, file.buffer, (err) => {
      if (err) {
        throw new BadRequestException({ message: 'file has not been writen!' })
      }
    });
  
    return url + name + '.' + extension;
  }
  async validateImageFile(file) {
    const extension = file.mimetype.split('/')[1];
    if (extension.toLowerCase() == 'jpeg' || extension.toLowerCase() == 'png') {
      return true;
    } else return false;
  }
  
  async convertBase64(type: string, base64) {
    const directoryPath = path.join(__dirname, '../../../public/', type, '/');
    const url = type + '/';
    mkdirp.sync(directoryPath);
    const name = uuidv4();
    var matches = base64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (matches.length !== 3) {
      return new Error('Invalid input string');
    }
    let response = {};
    let responseType = matches[1];
    let responseData = Buffer.from(matches[2], 'base64');
    let key = responseType;
    let val = responseData;
    response[key] = val;
    let extension = responseType.split('/')[1];
    const filePath = (await directoryPath) + name + '.' + extension;
    if (extension !== 'png' && extension !== 'jpeg') {
      return 'the image should be in format PNG or JPEG';
    }

    

    await fs.writeFile(filePath, responseData, (err) => {
      if (err) {
        return err;
      }
    });
    return url + name + '.' + extension;
  }
  async deleteFileFromFolder(pathFile: string) {
    try {
      fs.unlinkSync(pathFile);
    } catch (err) {
      throw err;
    }
  }
  deletefile(path, reject): void {
    if (fs.existsSync(path)) {
      fs.unlink(path, (err) => {
        if (err) {
          reject(err);
        }
      });
    }

  }
  async generateFileName(file: any): Promise<string> {
    const fileSplit = file.originalname.split('.');
    const extension = fileSplit[fileSplit.length - 1];
    const name = uuidv4();
    return name + '.' + extension;
  }
  async validatePdfFile(file) {
    const extension = file.mimetype.split('/')[1];
    if (extension.toLowerCase() == 'pdf') {
      return true;
    } else return false;
  }
  async getBase64(path): Promise<any> {
    const imageToBase64 = require('image-to-base64');
    return new Promise((resolve, reject) => {
      imageToBase64(path)
        .then(
          (response) => {
            resolve(response)
          }
        )
        .catch(
          (error) => {
            reject(error)
          }
        )
    })
  }
  async loadFileIntoBuffer(url): Promise<any> {
    return new Promise((resolve, reject) => {
      var request = require('request').defaults({ encoding: null });
      request.get(url, function (err, res, body) {
        resolve(body)
      });
    })
  }
  async puppeteerGenerator(template, options): Promise<Buffer> {
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'], ignoreDefaultArgs: ['--disable-extensions'] });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.setContent(template)
    let pdfBuffer = null
    try {
      pdfBuffer = await page.pdf(options);
    } catch (err) {
      return null
    }
    await browser.close()
    return pdfBuffer;
  }
}
