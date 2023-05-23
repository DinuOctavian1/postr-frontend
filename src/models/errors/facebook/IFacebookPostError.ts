interface FacebookPostError {
  error: {
    message: string;
    type: string;
    code: number;
    error_subcode: number;
    is_transient: boolean;
    error_user_title: string;
    error_user_msg: string;
    fbtrace_id: string;
  };
}

export default FacebookPostError;
