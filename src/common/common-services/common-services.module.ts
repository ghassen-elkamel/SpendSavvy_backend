
import { Module } from '@nestjs/common';
import { FileUploadService } from '../../common/common-services/file-upload.service';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [HttpModule],
  providers: [FileUploadService, ],
  exports: [FileUploadService, ],
})
export class CommonServicesModule {}
