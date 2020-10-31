import AWS from 'aws-sdk';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  SES: new AWS.SES({
    apiVersion: '2010-12-01'
  }),
  sendingRate: 1
})

export default transporter;
