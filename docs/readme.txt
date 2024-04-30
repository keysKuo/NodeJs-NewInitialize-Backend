1. Các Services sẽ được gọi trong Controllers rồi gắn vào các Routes 
2. Chức năng các thư mục:
    a. auth/
        + authUtils.js: Thường là những chức năng dùng cho mục đích authentication
            - createTokenPair: Dùng JWT để khởi tạo accessToken & refreshToken với (payload, privateKey)
                               Dùng JWT để verify accessToken với (publicKey)
                               Return { accessToken, refreshToken }
        
        + checkAuth.js: Thường là những middleware dùng để check các key & permission để access vào api
            - checkApiKey: Kiểm tra 'x-api-key' trên Headers có hay không tồn tại trong danh sách APIKey (database)
            - checkPermission: Sau khi đã check ApiKey thì kiểm tra xem API này có đủ quyền truy cập hay không 
    
    b. configs/
        + config.mongodb.js: Nơi config các options đến database thông qua biến môi trường env

    c. controllers/ : Nơi chứa các middleware chính để kết nối với Routers

    d. dbs/
        + init.mongodb.js: Kết nối với database mongodb bằng Design Pattern Singleton

    e. helpers/
        + check.conntect.js: Nơi chứa các chức năng hỗ trợ trong việc kiểm tra kết nối đến với server - Memory usage, Connectiosn
            - countConnect: Đếm số lượng connections đang access vào server 
            - checkOverload: Kiểm tra xem server có đang bị quá tải đối với số lượng kết nối đến

    f. https/ : Nơi chứa các file Test Rest API thông qua giao thức http và https

    g. models/ : Nơi chứa các schema của hệ thống
     
    h. routes/ : Nơi chứa các router điều hướng luồng dữ liệu của hệ thống

    i. services/ : Nơi chứa các chức năng nhằm phục vụ cho các đối tượng cố định

    j. utils/ : Nơi chứa các chức năng hỗ trợ có thể dùng nhiều lần trong toàn hệ thống
