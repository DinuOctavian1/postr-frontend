import IGeneratePostRequest from 'models/request/ICreatePostRequest';
import IGeneratePostResponse from 'models/response/IGeneratePostResponse';
import { useState } from 'react';

const useGeneratePost = (
  apiAgent: any,
): {
  post: string;
  generatePost: (data: IGeneratePostRequest) => void;
  isLoading: boolean;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState<string>('');

  const generatePost = (data: IGeneratePostRequest) => {
    setIsLoading(true);
    apiAgent.Post.generateFacebookPost(data)
      .then((response: IGeneratePostResponse) => {
        setPost(response.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { post, generatePost, isLoading };
};

export default useGeneratePost;
