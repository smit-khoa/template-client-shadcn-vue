# Thuyết trình AI

---

## PHẦN 1: CÂU HỎI CHUNG

- Model Context Protocol (MCP): Giao thức MCP là gì và nó giải quyết vấn đề "M x N" trong kết nối dữ liệu như thế nào?
- MCP Components: Vai trò của MCP Host, MCP Client và MCP Server là gì?
- Web Interface vs API: Khi nào nên dùng giao diện Web và khi nào cần tích hợp qua API?
- SLM (Small Language Models): Mô hình ngôn ngữ nhỏ (SLM) là gì và lợi ích của việc chạy on-device?

## PHẦN 2: CÂU HỎI ĐẶC THÙ

- Data Compression (Nén dữ liệu): Khái niệm nén dữ liệu trong AI là gì? Tại sao nói AI lưu trữ "mối liên kết" (Patterns) thay vì cơ sở dữ liệu (Facts)?
- Context Window Utilization: Mức độ tiêu thụ ngữ cảnh của Agent có ý nghĩa gì?
- Fine-tuning Mechanism: Quá trình dạy lại mô hình (Fine-tuning) với dữ liệu được dán nhãn diễn ra như thế nào?
- Debugging Logic: Tại sao AI lại giỏi việc tìm lỗi (Debug) và giải thích lỗi (Explain Code) hơn là tự viết ra một kiến trúc hệ thống hoàn chỉnh từ đầu?
- Natural Language Programming: Liệu trong tương lai, ngôn ngữ lập trình phổ biến nhất có phải là "Tiếng Anh" (hoặc Tiếng Việt)? Khi rào cản cú pháp (Syntax) biến mất, kỹ năng cốt lõi của một Developer sẽ chuyển dịch từ "biết viết code" sang "biết tư duy hệ thống" và "biết kiểm định code" như thế nào?

---

## PHẦN 3: TRẢ LỜI

---

### Câu 1. Model Context Protocol (MCP): Giao thức MCP là gì và nó giải quyết vấn đề "M x N" trong kết nối dữ liệu như thế nào?

- MCP là một giao thức nguồn mở (được Anthropic phát triển) nó đóng vai trò như một cầu nối cho phép các mô hình AI kết nối, truy cập dữ liệu và sử dụng công cụ từ các hệ thống bên ngoài một cách an toàn và nhất quán

- trước đây để tích hợp hệ thống AI với các nguồn bên ngoài, chúng ta phải xây dựng các luồng kết nối riêng biệt, đó là vấn đề M x N
- chúng ta có M mô hình AI khác nhau (claude, ChatGPT, Cursor,...) và N nguồn dữ liệu khác nhau (Google Drive, GitHub,...), để đọc được dữ liệu từ Github, chúng ta phải viết một mã kết nối riêng biệt, để kết nối tới các nguồn dữ liệu khác, chúng ta lại phải viết thêm các mã kết nối khác, và khi muốn sử dụng các mô hình AI khác, chúng ta lại phải viết lại toàn bộ mã kết nối cho các nguồn đó
- tổng số lượng tích hợp cần xây dựng và bảo trì là M x N. quá trình này gây ra sự phân mảnh và tốn kém

- từ đó MCP giải quyết vấn đề "M x N" thành "M + N", mỗi bên chỉ cần triển khai giao thức MCP một lần:
    - Mỗi ứng dụng AI triển khai MCP Client (1 lần) → kết nối được với TẤT CẢ MCP Server.
    - Mỗi nguồn dữ liệu triển khai MCP Server (1 lần) → được TẤT CẢ AI truy cập.

- TRƯỚC MCP (M × N):

```
AI₁ ──┬── Data₁
AI₁ ──┤── Data₂
AI₂ ──┤── Data₁
AI₂ ──┤── Data₂
AI₃ ──┤── Data₁
AI₃ ──┴── Data₂
```

- SAU MCP (M + N):

```
AI₁ ──┐
AI₂ ──┼── [MCP Protocol] ──┬── Data₁
AI₃ ──┘                    ├── Data₂
                           └── Data₃
```

- 3 loại khả năng mà MCP cung cấp:
    - Resource: (chỉ đọc) chức năng chính là cung cấp ngữ cảnh cho mô hình, hoạt động giống như việc AI mở 1 file ra để đọc
    - Tools: (đọc và ghi) chức năng chính là cho phép AI thực hiện các hành động cụ thể thông qua Tool Calling (send_email, create_ticket, search_documents,...)
    - Prompts: (bản mẫu) chức năng chính là cung cấp các prompt đã được định nghĩa để hướng dẫn AI cách sử dụng server một cách tối ưu.

---

### Câu 2. MCP Components: Vai trò của MCP Host, MCP Client và MCP Server là gì?

- 3 thành phần cốt lõi:
    - MCP Host: ứng dụng AI mà mình tương tác trực tiếp, chứa LLM (Brain) và quản lý các MCP Client bên trong nó, ví dụ như Claude Desktop, Cursor IDE,...
    - MCP Client: thành phần nằm bên trong Host, duy trì kết nối 1:1 với một MCP Server cụ thể, mỗi MCP Server có một MCP Client riêng
    - MCP Server: chương trình nhẹ thực hiện kết nối và dịch thông tin từ các nguồn bên ngoài tới MCP Client

- Luồng hoạt động:

```
┌─────────────────────────────────────────────┐
│                 MCP HOST                     │
│  (Ứng dụng AI: Claude Desktop, IDE, App)    │
│                                              │
│  ┌──────────────┐  ┌──────────────┐          │
│  │ MCP Client 1 │  │ MCP Client 2 │  ...     │
│  └──────┬───────┘  └──────┬───────┘          │
└─────────┼─────────────────┼─────────────────┘
          │                 │
   ┌──────┴──────┐   ┌──────┴──────┐
   │ MCP Server  │   │ MCP Server  │
   │  (GitHub)   │   │  (Slack)    │
   └──────┬──────┘   └──────┬──────┘
          │                 │
   ┌──────┴──────┐   ┌──────┴──────┐
   │ GitHub API  │   │ Slack API   │
   └─────────────┘   └─────────────┘
```

- Khi nhận được yêu cầu từ User, MCP Host gửi cho LLM, LLM sẽ phân tích yêu cầu và gửi cho MCP Client tương ứng
- MCP Client nằm trong Host đã kết nối với MCP Server
- server lấy ra danh sách Tools, Resources, Prompts có sẵn trong MCP Server
- LLM phân tích và quyết định sẽ sử dụng tool nào, resource nào, prompt nào để thực hiện yêu cầu
- MCP Client gửi yêu cầu đến MCP Server, MCP Server thực hiện yêu cầu và trả kết quả về cho MCP Client
- MCP Client trả kết quả về cho LLM, LLM trả kết quả về cho User

- phương thức kết nối
    - stdio: dữ liệu được truyền qua lại thông qua luồng nhập và xuất (stdin, stdout), chạy trên máy tính local. Ưu điểm là nhanh và bảo mật tốt vì không mở cổng mạng
    - sse: phương thức này được dùng khi MCP server chạy remote, dữ liệu được truyền qua lại thông qua HTTP duy trì liên tục, chạy trên server. Ưu điểm là cho phép kết nối từ xa, dễ scale và quản lý tập trung

---

### Câu 3. Web Interface vs API: Khi nào nên dùng giao diện Web và khi nào cần tích hợp qua API?

1. Web Interface là cách tương tác với AI thông qua giao diện trên trình duyệt (ví dụ: chat.openai.com, claude.ai,...), người dùng gõ câu hỏi, AI trả lời trực tiếp trên màn hình

- ưu điểm:
    - dễ sử dụng, không cần kiến thức kỹ Thuật
    - sử dụng trực tiếp trên nền tảng không cần cài đặt cấu hình
    - có giao diện quản lý lịch sử hội thoại
- nhược điểm:
    - thao tác thủ công (phải copy-paste dữ liệu)
    - không tự động hóa được (không thể lên lịch chạy tự động)
    - giới hạn tùy chỉnh (phải dùng giao diện có sẵn)

2. API là phương thức cho phép ứng dụng của người dùng thao tác trực tiếp với AI bằng code, không cần giao diện, gửi request HTTP chứa yêu cầu, nhận response chứa câu trả lời, ví dụ như openai api, claude api,...

- ưu điểm:
    - tích hợp vào hệ thống (chatbot trên website, trợ lý trong app)
    - mình có thể kiểm soát toàn bộ (System Prompt, Temperature, model, format output)
    - xử lý hàng loạt (batch processing hàng nghìn yêu cầu)
- nhược điểm:
    - cần kiến thức lập trình
    - phải tự xây giao diện nếu muốn người dùng cuối tương tác

3. Khi nào nên dùng web interface và khi nào nên dùng API?

| Tình huống                    | Web Interface  | API       |
| ----------------------------- | -------------- | --------- |
| Cá nhân dùng hàng ngày        | Phù hợp       | Không cần |
| Brainstorm, viết nội dung     | Phù hợp       | Không cần |
| Chatbot trên website công ty  | Không phù hợp | Bắt buộc  |
| Tự động xử lý email hàng ngày | Không phù hợp | Bắt buộc  |
| Tích hợp AI vào app mobile    | Không phù hợp | Bắt buộc  |
| Xử lý 1.000 đơn hàng/ngày     | Không phù hợp | Bắt buộc  |

---

### Câu 4. SLM (Small Language Models): Mô hình ngôn ngữ nhỏ (SLM) là gì và lợi ích của việc chạy on-device?

- SML là tập con của AI, được thiết kế để xử lý ngôn ngữ tự nhiên một cách hiệu quả trên thiết bị có tài nguyên tính toán hạn chế, nó có kích thước gọn nhẹ hơn LLM, ít dữ liệu hơn nhưng tập trung cực giỏi ở một vài nhiệm vụ cụ thể
- lợi ích của việc chạy on-device:
    - Bảo mật dữ liệu: SML chạy trên thiết bị local, không cần internet, không cần gửi dữ liệu lên Cloud nên không bao giờ bị rò rỉ dữ liệu ra bên ngoài
    - Độ trễ cực thấp: Do không cần sử dụng internet, SML chạy ngay trên RAM/CPU của thiết bị nên tốc độ phản hồi gàn như ngay lập tức
    - Hoạt động ngoại tuyến: SML chạy offline hoàn toàn nên thích hợp sử dụng cho các nơi vùng sâu vùng xa hay ứng dụng cho phần mềm xe hơi,...
    - Chi phí vận hành: Do chạy trực tiếp trên local nên không cần trả tiền API theo token, không cần server đám mây nên chi phí vận hành gần như bằng 0

---

### Câu 5. Data Compression (Nén dữ liệu): Khái niệm nén dữ liệu trong AI là gì? Tại sao nói AI lưu trữ "mối liên kết" (Patterns) thay vì cơ sở dữ liệu (Facts)?

1. Nén dữ liệu trong AI

- Nén dữ liệu trong AI là quá trình nén tri thức, nó không nén giống như file .zip hay .rar thông thường
- Khi huấn luyện (Training), mô hình phải đọc hàng tỷ trang văn bản. Thay vì lưu trữ nguyên văn từng câu chữ (điều này là bất khả thi về mặt bộ nhớ), AI sẽ cố gắng tìm ra quy luật chung và nén chúng vào các trọng số (weights) của mạng nơ-ron, gọi là nén ngữ nghĩa có mất mát
- ví dụ: khi ta đọc 1 quyển sách về lịch sử Việt Nam, ta không thể nhớ nguyên văn từng từ từng chữ, nhưng ta nhớ được diễn biến từng thời kì lịch sử, bộ não ta đã nén toàn bộ quyển sách thành hệ thống nhận thức

2. Tại sao AI lưu trữ "mối liên kết" (Patterns) thay vì cơ sở dữ liệu (Facts)

- Bản chất kiến trúc của AI là các mạng thần kinh nhân tạo, nó được thiết kế để tư duy thay vì để lưu dữ liệu
- Nén thông tin: AI không đủ bộ nhớ để nó lưu hàng tỷ văn bản đã đọc, thay vì đó, nó lưu trữ quy luật, công thức, mối quan hệ giữa các văn bản, gọi là mối liên kết (Patterns)
- Mạng thần kinh: Thông tin AI nằm ở trọng số weights, khi người dùng hỏi một câu, nó sẽ truyền tín hiệu qua các kết nối này để tạo ra câu trả lời dựa trên xác suất cao nhất của các mối liên kết đó
- Khả năng suy luận: Nếu chỉ lưu dữ liệu, AI sẽ chỉ trả lời được những gì đã có sẵn, dựa vào cách lưu mối liên kết, nó có thể trả lời được những câu hỏi mà chưa từng có một cách thuyết phục

- ví dụ: AI không ghi nhớ Hà Nội là thủ đô Việt Nam, nó ghi nhớ rằng trong hàng triệu văn bản đã đọc, từ "Hà Nội", "Thủ đô", "Việt Nam" thường xuất hiện cực kỳ gần nhau và có mối quan hệ chặt chẽ với nhau, nên nó có thể trả lời được "Hà Nội là thủ đô của Việt Nam"

- Hệ quả của việc lưu trữ "mối liên kết" (Patterns)
    - Ưu điểm: AI có khả năng sáng tạo và suy luận trên những dữ liệu nó chưa từng thấy, vì nó hiểu quy luật chứ không phải học vẹt
    - Nhược điểm: gây hiện tượng ảo giác: vì nó chỉ lưu "mối liên kết", nên khi "giải nén" thông tin để trả lời bạn, nó có thể kết nối các Pattern một cách sai lệch, tạo ra những thông tin nghe rất thuyết phục nhưng lại không có thật

---

### Câu 6. Context Window Utilization: Mức độ tiêu thụ ngữ cảnh của Agent có ý nghĩa gì?

1. Bản chất của sự tiêu thụ ngữ cảnh

- khác với lệnh prompt thông thường, agent hoạt động theo chu trình vòng lặp: Thought (suy nghĩ) → Action (hành động) → Observation (quan sát)
- Mỗi khi agent sử dụng một công cụ hoặc nhận kết quả trả về, toàn bộ lịch sử đó sẽ được lưu vào ngữ cảnh hiện tại để có thể suy luận cho bước tiếp theo, dung lượng ngữ cảnh sẽ phình to sau mỗi vòng lặp

2. Tại sao chỉ số này quan trọng?

- Nếu mức tiêu thụ ngữ cảnh không kiểm soát, việc phình to sẽ dẫn đến việc tốn quá nhiều token làm tăng chi phí
- Độ trễ hệ thống: mô hình càng đọc nhiều token đầu vào, nó sẽ cần nhiều thời gian xử lý dẫn đến thời gian xuất hiện chữ cái đầu tiên sẽ càng chậm
- Giảm hiệu năng suy luận: việc quá nhiều token đầu vào cũng sẽ gây hiện tượng lost in the middle, các thông tin ở giữa sẽ bị mờ đi dẫn đến AI có thể quên các ràng buộc quan trọng hoặc gọi sai công cụ,...
- Giới hạn tràn bộ nhớ: việc agent liên tục gọi các công cụ trả về dữ liệu quá lớn, khi đầy bộ nhớ, agent sẽ buộc dừng hoặc lỗi

3. Cách tối ưu

- Tóm tắt lịch sử: thay vì giữ nguyên toàn bộ lịch sử, tóm tắt các bước cũ thành đoạn ngắn
- Giới hạn kết quả tool: chỉ lấy thông tin cần thiết, không lấy toàn bộ dữ liệu
- Chia tác vụ nhỏ: thay vì một phiên dài, chia thành nhiều phiên nhỏ với bộ nhớ dài hạn
- Chọn model có ngữ cảnh lớn: Claude (200K), GPT-4 (128K) cho tác vụ phức tạp nhiều bước

---

### Câu 7. Fine-tuning Mechanism: Quá trình dạy lại mô hình (Fine-tuning) với dữ liệu được dán nhãn diễn ra như thế nào?

1. Dữ liệu dán nhãn

- dữ liệu dán nhãn ở đây không phải là dữ liệu thô mà nó là các cặp đầu vào - đầu ra mong muốn, thường dưới dạng jSON, ví dụ: { instruction: "Hàm phải được viết theo chuẩn ES6", input: "Hãy viết hàm ...", output: "function myFunction() { ... }" }

2. Quy trình Fine-tuning

- bước 1: chuẩn bị dữ liệu: thu thập, dọn dẹp và format dữ liệu thành cặp input-output
- bước 2: chọn mô hình nền: chọn mô hình pre-trained phù hợp (ví dụ: GPT, LLaMA, GPT-3.5-turbo,...), mô hình càng mạnh thì kết quả fine-turning càng tốt
- bước 3: Huấn luyện: Chạy dữ liệu qua mô hình, tính Loss (sai số giữa output mô hình và output mong muốn) và cập nhật trọng số weights bằng thuật toán Gradient Descent. Quá trình này lặp lại nhiều Epoch cho đến khi Loss giảm đến mức chấp nhận được

- Có thể áp dụng kỹ thuật LoRA và QLoRA để tiết kiệm và giảm dung lượng

---

### Câu 8. Debugging Logic: Tại sao AI lại giỏi việc tìm lỗi (Debug) và giải thích lỗi (Explain Code) hơn là tự viết ra một kiến trúc hệ thống hoàn chỉnh từ đầu?

1. Tại sao AI lại giỏi tìm lỗi và giải thích lỗi?

- Không gian bài toán hẹp và rõ ràng: Khi giao cho AI việc tìm lỗi hoặc giải thích đoạn code, vấn đề ở đây được thu hẹp đáng kể. Ta cung cấp đầu vào, dấu hiệu lỗi, AI chỉ cần tập trung vào quy tắc cú pháp và logic
- AI được huấn luyện từ hàng tỷ dòng code từ Github, StackOverflow,... và các lỗi hầu hết đã lặp đi lặp lại nên AI dễ dàng map với các pattern nó đã thấy, ví dụ như "Cannot read property 'x' of undefined",...

2. Tại sao AI chưa giỏi trong việc tự viết ra một kiến trúc hệ thống?

- thiếu hiểu biết về bối cảnh: Một hệ thống không chỉ là viết code, nó cần phải hiểu các bài toán về kinh doanh, ngân sách, nhân sự,... nên chưa thể đưa ra các đánh đổi (trade-off) phù hợp
- giới hạn về ngữ cảnh: hệ thống hoàn chỉnh bao gồm hàng nghìn thành phần tương tác và phức tạp xuyên suốt hàng trăm file khác nhau nên AI xử lý kiến trúc có thể bị rời rạc hoặc nhất quán do tràn ngữ cảnh, ảo giác
- chỉ cần không đủ thông tin yêu cầu từ con người, các module này sai có thể dẫn đến các module liên quan sai sót theo

---

### Câu 9. Natural Language Programming: Liệu trong tương lai, ngôn ngữ lập trình phổ biến nhất có phải là "Tiếng Anh" (hoặc Tiếng Việt)? Khi rào cản cú pháp (Syntax) biến mất, kỹ năng cốt lõi của một Developer sẽ chuyển dịch từ "biết viết code" sang "biết tư duy hệ thống" và "biết kiểm định code" như thế nào?

- trong tương lai, ngôn ngữ lập trình phổ biến nhất có phải là "tiếng anh" (hoặc tiếng việt)? câu trả lời là: có thể. Thay vì chúng ta phải gõ code thủ công, hoặc ngồi tự viết hàm thì AI có thể viết nhanh hơn chúng ta hàng trăm lần, công việc của chúng ta là ngồi viết prompt với ngôn ngữ tự nhiên tuy nhiên, ngôn ngữ tự nhiên thường có tính chất mơ hồ, trong các dự án phức tạp, ngôn ngữ lập trình truyền thống vẫn sẽ được dùng để đảm bảo tính chính xác tuyệt đối mà ngôn ngữ tự nhiên chưa làm được

- chính vì vậy, Developer thay vì "viết code" thì sẽ chuyển dịch sang "tư duy hệ thống" và "kiểm định code"
    - xóa bỏ rào cản cú pháp: việc ghi nhớ các cú pháp Syntax không còn quá quan trọng nữa, khi mà AI tự động chuyển đổi chúng thành mã hoàn chỉnh từ việc chúng ta ra lệnh
    - về tư duy hệ thống: thay vì chú tâm vào viết các hàm, dev sẽ tập trung vào các module kết nối với nhau như thế nào, luồng dữ liệu trong hệ thống hoạt động ra sao, mở rộng hệ thống như thế nào. Dev sẽ tập trung vào việc mô tả ý tưởng, tính năng còn việc code và debug sẽ là công việc của AI
    - về kiểm định code: AI có thể tạo ra code rất nhanh nhưng có thể chứa lỗi bảo mật, lỗi logic hoặc không tối ưu, hiệu năng kém,... cho nên dev sẽ phải là người review, kiểm định cách code hoạt động ra sao, đảm bảo không có lỗi xảy ra

-> khi rào cản cú pháp biến mất, không có nghĩa là Dev sẽ biến mất, mà là chuyển dịch từ "viết code" sang "tư duy hệ thống" và "kiểm định code", yêu cầu phải có kỹ năng prompt mô tả tính năng, luồng logic hệ thống và ràng buộc kỹ thuật để tận dụng AI vào phát triển phần mềm nhanh hơn, chính xác hơn
