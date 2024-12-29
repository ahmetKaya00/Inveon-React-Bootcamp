export const BrowserRouter = ({ children }) => <div>{children}</div>;


export const Routes = ({ children }) => <div>{children}</div>;


export const Route = ({ children }) => <div>{children}</div>;


export const useNavigate = () => jest.fn();


export const Link = ({ children, ...props }) => <a {...props}>{children}</a>;