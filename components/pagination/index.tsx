import { Pagination as AntdPagination } from 'antd';
interface PaginationType extends Omit<React.ComponentProps<typeof AntdPagination>, 'onChange'>{
  pageInfo: {
    page: number;
    total: number;
  };
  setPageInfo: (page: number) => void;
  onChange?: (page: number) => void;
}
const Pagination: React.FC<PaginationType> = ({pageInfo, setPageInfo, onChange, ...config}) => {
  const handlerChange = (page: number) => {
    setPageInfo(page)
    onChange && onChange(page)
  }
  return <AntdPagination
    showSizeChanger={false}
    showQuickJumper
    current={pageInfo.page}
    total={pageInfo.total}
    onChange={handlerChange}
    {...config}
  />
}

export default Pagination