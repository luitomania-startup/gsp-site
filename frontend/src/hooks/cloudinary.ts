import React,{useState} from 'react'
import { getUploadSign } from '../services/members';

const cloudName = `${import.meta.env.VITE_CLOUD_NAME}`; // replace with your own cloud name
// const uploadPreset = "members"; // replace with your own upload preset 
const api_key = import.meta.env.VITE_CLOUDINARY_API_KEY;

interface IuseCloudinaryProps {
  defaultvalue : string ; 
  uploadPreset : string;
}


export const useCloudinary = (defaultvalue:string,uploadPreset:string,tag: string,uploadSignPreset:string) : [string ,()=> void] => {
    const [bookingUploadedFilename, setBookingUploadedFilename] = useState(defaultvalue);
    const [bookingUploadedFilenamePublic, setBookingUploadedFilenamePublic] = useState("");

    const upload = async () => {
        const res = await getUploadSign(uploadSignPreset);
        // // console.log(res);
        var myWidget = window.cloudinary.openUploadWidget(
          {
            cloudName: cloudName,
            uploadPreset: uploadPreset,
            uploadSignatureTimestamp: res.data.timestamp,
            uploadSignature: res.data.signature,
            cropping: false,
            // cropping: true, //add a cropping step
            // showAdvancedOptions: true,  //add advanced options (public_id and tag)
            // sources: [ "local", "url"], // restrict the upload sources to URL and local files
            multiple: false, //restrict upload to a single file
            // folder: "career_attachments", //upload files to the specified folder
            tags: [`${tag}`], //add the given tags to the uploaded files
            apiKey: api_key,
    
            // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
            // clientAllowedFormats: ["images"], //restrict uploading to image files only
            // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
            // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
            theme: "purple", //change to a purple theme
            styles: {
              palette: {
                window: "#F5F5F5",
                sourceBg: "#FFFFFF",
                windowBorder: "#90a0b3",
                tabIcon: "#0094c7",
                inactiveTabIcon: "#69778A",
                menuIcons: "#0094C7",
                link: "#53ad9d",
                action: "#8F5DA5",
                inProgress: "#0194c7",
                complete: "#53ad9d",
                error: "#c43737",
                textDark: "#000000",
                textLight: "#FFFFFF",
              },
              fonts: {
                default: null,
                "'Poppins', sans-serif": {
                  url: "https://fonts.googleapis.com/css?family=Poppins",
                  active: true,
                },
              },
            },
          },
          (error: any, result: any) => {
            if (!error && result && result.event === "success") {
              // console.log("Done! Here is the file info: ", result.info);
              setBookingUploadedFilename(result.info.secure_url);
              setBookingUploadedFilenamePublic(result.info.public_id);
              alert("file upload successfull");
            }
          }
        );
        //myWidget.open();
      };
  return [bookingUploadedFilename,upload];
}

