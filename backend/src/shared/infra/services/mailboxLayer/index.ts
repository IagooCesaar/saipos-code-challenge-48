import axios from "axios";

const key = process.env.MAILBOXLAYER_KEY;

const mailboxLayer = axios.create({
  baseURL: `http://apilayer.net/api/check`,
  params: {
    access_key: key,
  },
});

export { mailboxLayer };
