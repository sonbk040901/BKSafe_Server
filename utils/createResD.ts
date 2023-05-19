/**
 *
 * @param success request có thành công hay không
 * @param data dữ liệu trả về nếu thành công, hoặc message nếu thất bại
 * @param type loại lỗi nếu có
 * @returns
 */
const f = (success: boolean, data: any, errType?: string) => {
  return {
    success,
    [success ? "data" : "message"]: data,
    type: errType,
  };
};
export default f;
