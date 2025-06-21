function ContactSection() {
  return (
    <section id="contact" className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Liên hệ với chúng tôi
          </h2>
          <p className="text-lg text-gray-600">
            Để lại thông tin để nhận tư vấn miễn phí từ đội ngũ chuyên gia của
            HCM57 Solution
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <form className="space-y-6">
              {/* Tên đầy đủ */}
              <div>
                <label
                  htmlFor="fullName"
                  className="text-sm text-black font-medium"
                >
                  Tên đầy đủ của bạn *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  placeholder="Nhập họ và tên của bạn"
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-green-600 focus:ring-green-600"
                />
              </div>

              {/* Số điện thoại */}
              <div>
                <label
                  htmlFor="phone"
                  className="text-sm text-black font-medium"
                >
                  Số điện thoại liên hệ *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  placeholder="Nhập số điện thoại của bạn"
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-green-600 focus:ring-green-600"
                />
              </div>

              {/* Tỉnh thành */}
              <div>
                <label
                  htmlFor="province"
                  className="text-sm text-black font-medium"
                >
                  Tỉnh thành
                </label>
                <select
                  id="province"
                  name="province"
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-green-600 focus:ring-green-600"
                >
                  <option value="">Chọn tỉnh thành của bạn</option>
                  <option value="Hà Nội">Hà Nội</option>
                  <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                  <option value="Đà Nẵng">Đà Nẵng</option>
                  <option value="Hải Phòng">Hải Phòng</option>
                  <option value="Cần Thơ">Cần Thơ</option>
                  <option value="Bình Dương">Bình Dương</option>
                  <option value="Thừa Thiên Huế">Thừa Thiên Huế</option>
                </select>
              </div>

              {/* Nhu cầu */}
              <div>
                <label
                  htmlFor="needs"
                  className="text-sm text-black font-medium"
                >
                  Nhu cầu của bạn *
                </label>
                <select
                  id="needs"
                  name="needs"
                  required
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-green-600 focus:ring-green-600"
                >
                  <option value="">Chọn dịch vụ bạn quan tâm</option>
                  <option value="Tư vấn giải pháp Website">
                    Tư vấn giải pháp Website
                  </option>
                  <option value="Phần mềm quản lý khách sạn (H5768 FO)">
                    Phần mềm quản lý khách sạn (H5768 FO)
                  </option>
                  <option value="Phần mềm quản lý nhà hàng (H5768 POS)">
                    Phần mềm quản lý nhà hàng (H5768 POS)
                  </option>
                  <option value="Phần mềm kế toán (H5768 BO)">
                    Phần mềm kế toán (H5768 BO)
                  </option>
                  <option value="Phần mềm quản lý nhân sự (H5768 HR)">
                    Phần mềm quản lý nhân sự (H5768 HR)
                  </option>
                  <option value="Hệ thống Booking Online">
                    Hệ thống Booking Online
                  </option>
                  <option value="Dịch vụ IT Outsourcing">
                    Dịch vụ IT Outsourcing
                  </option>
                  <option value="Tư vấn chuyển đổi số">
                    Tư vấn chuyển đổi số
                  </option>
                  <option value="Khác">Khác</option>
                </select>
              </div>

              {/* Nút gửi */}
              <button
                type="submit"
                className="w-full h-10 px-4 py-3 bg-green-600 hover:bg-green-700 text-white text-lg font-medium rounded-md"
              >
                Đăng ký tư vấn
              </button>
            </form>

            <p className="text-sm text-gray-500 mt-4 text-center">
              Bằng cách gửi form này, bạn đồng ý để HCM57 Solution liên hệ tư
              vấn qua thông tin đã cung cấp.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
