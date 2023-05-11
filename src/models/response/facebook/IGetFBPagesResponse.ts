import IFacebookPage from 'models/facebook/IFacebookPage';

interface IGetFacebookPagesResponse {
  data: IFacebookPage[];
  paging: {
    before: string;
    after: string;
  };
}

export default IGetFacebookPagesResponse;
