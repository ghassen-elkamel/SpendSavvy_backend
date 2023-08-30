import { Test, TestingModule } from '@nestjs/testing';
import { FileUploadService } from './file-upload.service';

describe('fileUploadService', () => {
    let service: FileUploadService;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FileUploadService,

            ],
        }).compile();
        service = module.get<FileUploadService>(FileUploadService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('should upload file', async () => {
        const spy = jest.spyOn(service, 'upload')
        await service.upload('test', {
            originalname: 'file.file'
        })
        expect(spy).toBeCalled()
    })
    it('should validate image file', async () => {
        const spy = jest.spyOn(service, 'validateImageFile')
        await service.validateImageFile({
            mimetype: 'image/png',
        })
        expect(spy).toBeCalled()
    })
    it('should convertBase64', async () => {
        const spy = jest.spyOn(service, 'convertBase64')
        await service.convertBase64('test', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYkAAAEVCAYAAAAVeRmFAAABP2lDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSCwoyGFhYGDIzSspCnJ3UoiIjFJgf8rAyiDMwMkgwmCUmFxc4BgQ4ANUwgCjUcG3awyM')
        expect(spy).toBeCalled()
    })
    it('should generateFileName', async () => {
        const spy = jest.spyOn(service, 'generateFileName')
        await service.generateFileName({
            originalname: 'file.file'
        })
        expect(spy).toBeCalled()
    })
    it('should validatePdfFile', async () => {
        const spy = jest.spyOn(service, 'validatePdfFile')
        await service.validatePdfFile({
            mimetype: 'file/file'
        })
        expect(spy).toBeCalled()
    })
    it('should validatePdfFile', async () => {
        const spy = jest.spyOn(service, 'validatePdfFile')
        await service.validatePdfFile({
            mimetype: 'file/file'
        })
        expect(spy).toBeCalled()
    })
});