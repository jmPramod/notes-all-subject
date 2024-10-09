import axios from "axios";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByYW1vZGptNEBnbWFpbC5jb20iLCJpZCI6IjY3MDNmN2EyN2JlYWIyMDBiYTRjODVlYSIsImlhdCI6MTcyODMxMzMxNH0._3bWRQjClY4t1j-PqpjlRuWSF0Z__Q-AcQMK1bmsG-c";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string;
interface fetchSubjectListPayload {
  subject: string;
  page: number;
  limit: number;
}
export const fetchSubjectList = async (payload: fetchSubjectListPayload) => {
  try {
    let res = await axios.get(
      `${baseUrl}/get-notes/${payload.subject}?page=${payload.page}&limit=${payload.limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("res", res);

    return {
      status: res.status,
      statusCode: res.data.status,
      message: res.data.message,
      data: res.data.data,
    };
  } catch (error: any) {
    return {
      status: error.response.status,
      statusCode: error.response.data?.status,
      message: error.response.data.message,
      data: null,
    };
  }
};

export const createQuestions = async (payload: fetchSubjectListPayload) => {
  try {
    let res = await axios.post(`${baseUrl}/create-notes`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("res", res);

    return {
      status: res.status,
      statusCode: res.data.status,
      message: res.data.message,
      data: res.data.data,
    };
  } catch (error: any) {
    return {
      status: error.response.status,
      statusCode: error.response.data?.status,
      message: error.response.data.message,
      data: null,
    };
  }
};

export const fetchSubjectCategory = async () => {
  try {
    let res = await axios.get(`${baseUrl}/get-subject`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("res", res);

    return {
      status: res.status,
      statusCode: res.data.status,
      message: res.data.message,
      data: res.data.data,
    };
  } catch (error: any) {
    return {
      status: error.response.status || 500,
      statusCode: error.response.data?.status,
      message: error.response.data.message,
      data: null,
    };
  }
};
