import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { isValidObjectId, Model } from 'mongoose';
import { OCRBannerDTO } from './dto/ocr-banner.dto';
import { ReviewTaxiBannerDTO } from './dto/review-taxi-banner.dto';
import { TaxiBannerDTO } from './dto/taxi-banner.dto';
import { Taxi } from './schema/taxi.schema';
import { CustomError, UserData } from 'src/error-handler/error-handler';

@Injectable()
export class TaxiService {
  constructor(
    @InjectModel(Taxi.name)
    private taxiModel: Model<Taxi>,
  ) {}
  async findByBanner(taxiBannerDTO: TaxiBannerDTO): Promise<UserData> {
    //get the existing taxi
    const { taxiBanner } = taxiBannerDTO;
    const existingTaxi = await this.taxiModel.findOne({
      taxiBanner: taxiBanner,
    });
    //if taxi not found create new taxi
    if (existingTaxi == null) {
      const taxi = await this.taxiModel.create({
        taxiBanner: taxiBanner,
        score: 3,
      });
      return {
        status: 'Success',
        message: 'Taxi created',
        data: taxi,
      };
    }
    return {
      status: 'Success',
      message: 'Taxi created',
      data: existingTaxi,
    };
  }

  async rateTaxi(
    reviewTaxiBannerDTO: ReviewTaxiBannerDTO,
    id: mongoose.Types.ObjectId,
  ): Promise<CustomError | UserData> {
    //check if user id is valid
    const isValidId = isValidObjectId(id);
    if (!isValidId) {
      return {
        status: 'Failed',
        message: 'Invalid user id',
      };
    }
    //get the existing taxi
    const { taxiBanner, reviewScore } = reviewTaxiBannerDTO;
    const existingTaxi = await this.taxiModel.findOne({
      taxiBanner: taxiBanner,
    });
    //if taxi not found return error
    if (existingTaxi == null) {
      return {
        status: 'Failed',
        message: 'Taxi not found',
      };
    }
    const userExist = existingTaxi.reviwers.map((review) =>
      (review.user as any).equals(id),
    );
    //is userexist array contain true return error else update taxi
    if (userExist.includes(true)) {
      //update the taxi with the new review score
      await this.taxiModel.findOneAndUpdate(
        {
          taxiBanner: taxiBanner,
          'reviwers.user': id,
        },
        {
          $set: {
            'reviwers.$.score': reviewScore,
          },
        },
      );

      //get the updated taxi
      const updatedTaxi = await this.taxiModel.findOne({
        taxiBanner: taxiBanner,
      });
      //get the reviewers score array
      const reviewersScore = updatedTaxi.reviwers.map((review) => review.score);
      //get the average of the reviewers score array
      const averageScore =
        reviewersScore.reduce((a, b) => a + b, 0) / reviewersScore.length;
      //round the average score to an integer value and update the taxi score with the rounded value
      updatedTaxi.score = Math.round(averageScore);
      await updatedTaxi.save();
      return {
        status: 'Success',
        message: 'Your rating has been updated',
        data: updatedTaxi,
      };
    } else {
      await this.taxiModel.findByIdAndUpdate(existingTaxi._id, {
        $push: {
          reviwers: { user: id, score: reviewScore },
        },
      });
      //get the updated taxi
      const updatedTaxi = await this.taxiModel.findOne({
        taxiBanner: taxiBanner,
      });
      //get the reviewers score array
      const reviewersScore = updatedTaxi.reviwers.map((review) => review.score);
      //get the average of the reviewers score array
      const averageScore =
        reviewersScore.reduce((a, b) => a + b, 0) / reviewersScore.length;
      //round the average score to an integer value and update the taxi score with the rounded value
      updatedTaxi.score = Math.round(averageScore);
      await updatedTaxi.save();
      return {
        status: 'Success',
        message: 'Taxi updated',
        data: updatedTaxi,
      };
    }
  }

  async ocrBanner(ocrBanner: OCRBannerDTO): Promise<CustomError | UserData> {
    const { base64Image } = ocrBanner;
    const vision = require('@google-cloud/vision');
    //create a client with the json file credentials

    //use google vision api to get the text from the image
    const client = new vision.ImageAnnotatorClient({
      keyFilename: './trustycab-de7156824fd3.json',
    });
    const [result] = await client.textDetection(base64Image);
    const detections = result.textAnnotations;
    console.log(detections[0].description);
    //get the taxi banner from the ocr api
    const taxiBanner = await this.taxiModel.findOne({
      taxiBanner: detections[0].description,
    });
    //if taxi banner not found return error
    if (taxiBanner == null) {
      return {
        status: 'Failed',
        message: 'Taxi banner not found',
      };
    }
    return {
      status: 'Success',
      message: 'Taxi banner found',
      data: taxiBanner,
    };
  }
}
