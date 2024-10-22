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
interface langPropsVersion {
  [key: string]: string; // or whatever type the version should be
}
export const Language_version: langPropsVersion = {
  javascript: "18.15.0",
  typescript: "5.0.3",
  python: "3.10.0",
  java: "15.0.2",
  csharp: "6.12.0",
  php: "8.2.3",
};
const codeApi = axios.create({ baseURL: "https://emkc.org/api/v2/piston" });
export const editorApi = async (language: string, sourceCode: string) => {
  try {
    const response = await codeApi.post("/execute", {
      language: language,
      version: Language_version[language],
      files: [
        {
          name: "my_cool_code.js",
          content: sourceCode,
        },
      ],
    });
    return response.data;
  } catch (error) {}
};

export const deleteSingleSubject = async (id: string) => {
  try {
    let res = await axios.delete(`${baseUrl}/delete-notes/${id}`, {
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
