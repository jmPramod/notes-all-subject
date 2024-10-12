import axios from "axios";
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
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return {
      status: res?.status,
      statusCode: res?.data?.status,
      message: res?.data.message,
      data: res?.data?.data,
      info: res?.data.info,
    };
  } catch (error: any) {
    console.log("erroe", error);
    return {
      status: error.response?.status,
      statusCode: error.response?.data?.status,
      message: error.response?.data.message,
      data: null,
    };
  }
};

export const createQuestions = async (payload: any) => {
  try {
    let res = await axios.post(`${baseUrl}/create-notes`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return {
      status: res?.status,
      statusCode: res?.data?.status,
      message: res?.data.message,
      data: res?.data?.data,
    };
  } catch (error: any) {
    console.log("erroe", error);
    return {
      status: error.response?.status,
      statusCode: error.response?.data?.status,
      message: error.response?.data.message,
      data: null,
    };
  }
};

export const fetchSubjectCategory = async () => {
  try {
    let res = await axios.get(`${baseUrl}/get-subject`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return {
      status: res?.status,
      statusCode: res?.data?.status,
      message: res?.data.message,
      data: res?.data?.data,
    };
  } catch (error: any) {
    console.log("erroe", error);

    return {
      status: error.response?.status || 500,
      statusCode: error.response?.data?.status,
      message: error.response?.data.message,
      data: null,
    };
  }
};

export const login = async (payload: { email: string; password: string }) => {
  try {
    let res = await axios.post(`${baseUrl}/login`, payload, {});

    return {
      status: res?.status,
      statusCode: res?.data?.status,
      message: res?.data.message,
      data: res?.data?.data,
      token: res?.data.token,
    };
  } catch (error: any) {
    console.log("erroe", error);
    return {
      status: error.response?.status,
      statusCode: error.response?.data?.status,
      message: error.response?.data.message,
      data: null,
    };
  }
};
export const fetchSingleSubject = async (id: string) => {
  try {
    let res = await axios.get(`${baseUrl}/get-single-notes/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return {
      status: res?.status,
      statusCode: res?.data?.status,
      message: res?.data.message,
      data: res?.data?.data,
      info: res?.data.info,
    };
  } catch (error: any) {
    console.log("erroe", error);
    return {
      status: error.response?.status,
      statusCode: error.response?.data?.status,
      message: error.response?.data.message,
      data: null,
    };
  }
};

export const updateQuestions = async (payload: any, id: string) => {
  try {
    let res = await axios.patch(`${baseUrl}/update-notes/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return {
      status: res?.status,
      statusCode: res?.data?.status,
      message: res?.data.message,
      data: res?.data?.data,
    };
  } catch (error: any) {
    console.log("erroe", error);
    return {
      status: error.response?.status,
      statusCode: error.response?.data?.status,
      message: error.response?.data.message,
      data: null,
    };
  }
};
