interface IFacebookPage {
  access_token: string;
  category: string;
  category_list: { id: string; name: string }[];
  id: string;
  name: string;
  tasks: string[];
}

export default IFacebookPage;
