import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OCRBannerDTO } from './dto/ocr-banner.dto';
import { ReviewTaxiBannerDTO } from './dto/review-taxi-banner.dto';
import { TaxiBannerDTO } from './dto/taxi-banner.dto';
import { TaxiService } from './taxi.service';
import { Public } from 'src/auth/public.decorator';
@Controller('taxi')
export class TaxiController {
  constructor(private taxiServices: TaxiService) {}
  @Post()
  @Public()
  async getTaxiBanner(
    @Body()
    taxiBannerDTO: TaxiBannerDTO,
  ): Promise<any> {
    return this.taxiServices.findByBanner(taxiBannerDTO);
  }
  @Post('rate')
  @UseGuards(AuthGuard())
  async rate(
    @Body()
    reviewTaxiBannerDTO: ReviewTaxiBannerDTO,
    //get user id from token payload and add it to the reviewTaxiBannerDTO object
    @Req() req,
  ): Promise<any> {
    const id = req.user.id;
    return this.taxiServices.rateTaxi(reviewTaxiBannerDTO, id);
  }

  @Post('ocr-banner')
  @UseGuards(AuthGuard())
  async ocrBanner(
    @Body()
    ocrBanner: OCRBannerDTO,
    //get user id from token payload and add it to the reviewTaxiBannerDTO object
  ): Promise<any> {
    return this.taxiServices.ocrBanner(ocrBanner);
  }
}