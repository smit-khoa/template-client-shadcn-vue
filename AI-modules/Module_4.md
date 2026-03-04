# AI Training Curriculum

> **Lưu ý:** Các dòng chữ tô đỏ thì đội tech bắt buộc phải học, còn với các nhân sự khác có thể học hoặc bỏ qua.

---

## MODULE 4: AI AGENT & HỆ THỐNG TỰ ĐỘNG (AGENTIC AI)

### 1. Cấu trúc một AI Agent

-   Sự khác biệt cốt lõi giữa Chatbot và AI Agent là gì?

> **Trả lời:**
>
> **1. Chatbot — Phản ứng theo lượt**
>
> Chatbot truyền thống (kể cả ChatGPT, Claude khi dùng ở chế độ cơ bản) hoạt động theo mô hình "hỏi-đáp từng lượt"
> (turn-by-turn). Người dùng gửi tin nhắn → AI trả lời → xong. AI không tự chủ động hành động, không gọi công cụ bên
> ngoài, không lập kế hoạch nhiều bước.
>
> -   **Phạm vi:** Chỉ xử lý trong Context Window hiện tại.
> -   **Khả năng:** Trả lời câu hỏi, viết văn bản, dịch thuật, tóm tắt — tất cả đều là "tạo văn bản".
> -   **Giới hạn:** Không thể tự tra cứu web, không tự gửi email, không tự chạy code, không tự lên lịch.
>
> **2. AI Agent — Tự chủ hành động**
>
> AI Agent là hệ thống nơi LLM đóng vai trò "bộ não" ra quyết định, kết hợp với khả năng sử dụng công cụ (Tools), bộ nhớ
> (Memory), và lập kế hoạch (Planning) để tự chủ thực hiện các tác vụ phức tạp, nhiều bước mà không cần con người can
> thiệp từng bước.
>
> -   **Phạm vi:** Mở rộng ra thế giới bên ngoài thông qua công cụ.
> -   **Khả năng:** Tìm kiếm web, đọc email, viết file, chạy code, gọi API, đặt lịch — kết hợp nhiều hành động liên
>     tiếp.
> -   **Tự chủ:** Agent tự phân tích vấn đề, lập kế hoạch, thực hiện, đánh giá kết quả, và điều chỉnh nếu sai.
>
> **3. So sánh trực quan**
>
> | Đặc điểm          | Chatbot                    | AI Agent                                                 |
> | ----------------- | -------------------------- | -------------------------------------------------------- |
> | Mô hình hoạt động | Hỏi → Đáp (1 lượt)         | Mục tiêu → Lập kế hoạch → Hành động → Đánh giá → Lặp lại |
> | Sử dụng công cụ   | Không (hoặc rất hạn chế)   | Có (Search, Code, API, File...)                          |
> | Bộ nhớ dài hạn    | Không (chỉ Context Window) | Có (lưu trữ ngoài)                                       |
> | Tự chủ            | Thụ động (chờ lệnh)        | Chủ động (tự hành động)                                  |
> | Ví dụ             | ChatGPT chat thường        | Claude Code, AutoGPT, Devin                              |
>
> **4. Ví dụ cụ thể**
>
> Yêu cầu: "Hãy nghiên cứu 3 đối thủ cạnh tranh và tạo báo cáo so sánh."
>
> -   **Chatbot:** Dựa vào kiến thức nén, viết một bài phân tích chung chung, có thể sai hoặc lỗi thời.
> -   **AI Agent:**
>     1. Tự tìm kiếm Google về 3 đối thủ.
>     2. Tự truy cập website từng đối thủ, đọc thông tin.
>     3. Tự tổng hợp dữ liệu vào bảng so sánh.
>     4. Tự viết báo cáo và lưu file.
>     5. Tự kiểm tra lại nếu thiếu thông tin → quay lại bước 1.
>
> _Dòng kiến thức vàng:_ Chatbot là "người trả lời qua điện thoại" — chỉ nói chuyện. AI Agent là "nhân viên có tay chân"
> — vừa suy nghĩ vừa hành động, vừa dùng công cụ vừa tự điều chỉnh. Sự khác biệt cốt lõi nằm ở ba chữ: công cụ, bộ nhớ
> và tự chủ.

-   **Agent Architecture:** Các thành phần cốt lõi của một AI Agent (Brain, Memory, Tools, Planning) là gì?

> **Trả lời:**
>
> **1. Kiến trúc tổng quan của AI Agent**
>
> Một AI Agent hoàn chỉnh được xây dựng từ 4 thành phần cốt lõi, mỗi thành phần đóng một vai trò không thể thiếu:
>
> ```
>                    ┌──────────────┐
>                    │   PLANNING   │ ← Lập kế hoạch
>                    └──────┬───────┘
>                           │
>          ┌────────────────┼────────────────┐
>          │                │                │
>   ┌──────┴──────┐  ┌─────┴──────┐  ┌──────┴──────┐
>   │    BRAIN    │  │   MEMORY   │  │    TOOLS    │
>   │   (LLM)    │  │ (Bộ nhớ)   │  │ (Công cụ)   │
>   └─────────────┘  └────────────┘  └─────────────┘
> ```
>
> **2. Brain (Bộ não) — LLM**
>
> -   **Vai trò:** Trung tâm ra quyết định. LLM phân tích yêu cầu, hiểu ngữ cảnh, suy luận, và quyết định hành động tiếp
>     theo.
> -   **Hoạt động:** Nhận tất cả thông tin từ Memory, kết quả từ Tools, và mục tiêu từ Planning, sau đó sinh ra hành
>     động tiếp theo (gọi tool nào? với tham số gì? hay đã đủ thông tin để trả lời?).
> -   **Ví dụ:** GPT-4, Claude, LLaMA đóng vai "Brain" cho agent.
>
> **3. Memory (Bộ nhớ)**
>
> -   **Short-term Memory (Ngắn hạn):** Chính là Context Window — lịch sử hội thoại trong phiên làm việc hiện tại. Bị
>     giới hạn bởi kích thước Context Window.
> -   **Long-term Memory (Dài hạn):** Hệ thống lưu trữ bên ngoài (Vector Database, file, database) giúp Agent "nhớ"
>     thông tin qua nhiều phiên. Agent có thể ghi nhớ sở thích người dùng, kết quả các tác vụ trước đó, kiến thức tích
>     lũy.
> -   **Working Memory (Bộ nhớ làm việc):** Trạng thái hiện tại của tác vụ — Agent đang ở bước nào, đã hoàn thành gì,
>     cần làm gì tiếp.
> -   _Ẩn dụ:_ Short-term = bảng trắng (xóa khi hết phiên). Long-term = sổ tay (giữ mãi). Working Memory = danh sách
>     TODO đang làm.
>
> **4. Tools (Công cụ)**
>
> -   **Vai trò:** "Tay chân" của Agent — cho phép nó tương tác với thế giới bên ngoài. Không có Tools, Agent chỉ là
>     Chatbot.
> -   **Các loại Tool phổ biến:**
>     -   **Search:** Tìm kiếm web (Google, Bing).
>     -   **Code Execution:** Chạy code Python, JavaScript.
>     -   **File Operations:** Đọc, viết, chỉnh sửa file.
>     -   **API Calls:** Gọi API bên ngoài (gửi email, tra cứu CRM, đặt lịch).
>     -   **Database:** Truy vấn cơ sở dữ liệu.
>     -   **Browser:** Truy cập và đọc nội dung trang web.
> -   Cơ chế sử dụng Tool được gọi là Function Calling (sẽ thảo luận chi tiết ở câu tiếp theo).
>
> **5. Planning (Lập kế hoạch)**
>
> -   **Vai trò:** Khả năng phân rã một mục tiêu lớn thành các bước nhỏ, sắp xếp thứ tự thực hiện, và điều chỉnh kế
>     hoạch khi gặp vấn đề.
> -   **Các chiến lược Planning:**
>     -   **Task Decomposition:** Chia tác vụ lớn thành danh sách bước nhỏ.
>     -   **ReAct Loop:** Suy nghĩ → Hành động → Quan sát → Lặp lại (đã học ở Module 2).
>     -   **Reflection:** Sau mỗi bước, Agent tự đánh giá: "Bước này có đúng không? Cần điều chỉnh gì?"
> -   _Ví dụ:_ Yêu cầu "Phân tích 5 đối thủ cạnh tranh" → Agent tự phân rã: (1) Xác định danh sách đối thủ, (2) Tra cứu
>     từng đối thủ, (3) Thu thập dữ liệu, (4) So sánh, (5) Viết báo cáo.
>
> _Dòng kiến thức vàng:_ AI Agent = Brain (LLM ra quyết định) + Memory (nhớ ngắn hạn và dài hạn) + Tools (tương tác thế
> giới) + Planning (lập kế hoạch và tự điều chỉnh). Thiếu bất kỳ thành phần nào, Agent sẽ bị "khuyết tật": không có
> Brain thì không suy luận, không có Tools thì chỉ nói suông, không có Memory thì quên ngay, không có Planning thì làm
> lung tung.

-   **Function Calling:** Khả năng gọi công cụ (Tools / Function Calling) cho phép AI làm được những gì? Làm sao AI biết
    khi nào cần dùng công cụ (ví dụ: Google Search, Calculator)?

> **Trả lời:**
>
> **1. Function Calling là gì?**
>
> Function Calling (Gọi hàm) là khả năng của LLM nhận diện khi nào cần sử dụng một công cụ bên ngoài, tự động tạo ra
> "lời gọi hàm" với tham số phù hợp, nhận kết quả trả về, và tích hợp kết quả đó vào câu trả lời.
>
> Đây là cầu nối biến LLM từ "máy tạo văn bản" thành "AI có khả năng hành động".
>
> **2. Function Calling cho phép AI làm gì?**
>
> -   **Truy vấn dữ liệu thời gian thực:** Tra giá cổ phiếu, thời tiết, tỷ giá — thông tin mà kiến thức nén không có.
> -   **Thực thi hành động:** Gửi email, tạo calendar event, đặt hàng, tạo ticket hỗ trợ.
> -   **Tính toán chính xác:** Gọi calculator hoặc chạy code Python cho phép tính phức tạp — thay vì "đoán" bằng kiến
>     thức nén.
> -   **Truy cập hệ thống nội bộ:** Tra cứu CRM, kiểm tra tồn kho, xem lịch sử đơn hàng.
> -   **Xử lý file:** Đọc PDF, phân tích Excel, tạo biểu đồ.
>
> **3. Làm sao AI biết khi nào cần dùng công cụ?**
>
> Quy trình diễn ra trong 4 bước:
>
> -   **Bước 1 — Khai báo Tools (Tool Schema):** Nhà phát triển cung cấp cho AI danh sách các tool có sẵn, kèm mô tả
>     chức năng và tham số.
>
>     ```json
>     {
>         "name": "get_weather",
>         "description": "Lấy thông tin thời tiết hiện tại của một thành phố",
>         "parameters": {
>             "city": { "type": "string", "description": "Tên thành phố" }
>         }
>     }
>     ```
>
> -   **Bước 2 — AI phân tích câu hỏi:** Khi nhận câu hỏi "Thời tiết Hà Nội hôm nay thế nào?", AI nhận ra đây là thông
>     tin thời gian thực mà nó không biết → cần dùng tool `get_weather`.
>
> -   **Bước 3 — AI tạo lời gọi hàm:** Thay vì tạo văn bản trả lời, AI sinh ra một JSON gọi hàm:
>
>     ```json
>     { "function": "get_weather", "arguments": { "city": "Hà Nội" } }
>     ```
>
> -   **Bước 4 — Nhận kết quả và trả lời:** Hệ thống thực thi hàm, trả kết quả cho AI. AI tổng hợp kết quả thành câu trả
>     lời tự nhiên: "Thời tiết Hà Nội hôm nay 28°C, trời nắng nhẹ, có mây rải rác."
>
> **4. Cơ chế "nhận diện" khi nào cần tool**
>
> AI được huấn luyện (qua Fine-tuning + RLHF) để:
>
> -   **So sánh năng lực:** "Câu hỏi này tôi có thể trả lời bằng kiến thức nén không?" Nếu không (thông tin thời gian
>     thực, tính toán phức tạp, cần thực thi hành động) → gọi tool.
> -   **Khớp mô tả:** AI đọc description của từng tool và đánh giá tool nào phù hợp nhất với yêu cầu hiện tại.
> -   **Quyết định tham số:** AI trích xuất thông tin từ câu hỏi để điền vào parameters của tool.
>
> **5. Ví dụ chuỗi Function Calling**
>
> Yêu cầu: "Gửi email cho sếp Minh báo cáo doanh thu tháng này."
>
> 1. AI gọi `get_revenue(month="current")` → Nhận: "Doanh thu tháng 2: 1.2 tỷ VND"
> 2. AI gọi `get_contact(name="Minh", role="manager")` → Nhận: "minh@company.com"
> 3. AI gọi `send_email(to="minh@company.com", subject="Báo cáo doanh thu T2", body="...")` → Nhận: "Đã gửi thành công"
> 4. AI trả lời: "Em đã gửi email báo cáo doanh thu tháng 2 (1.2 tỷ VND) cho anh Minh."
>
> _Dòng kiến thức vàng:_ Function Calling biến AI từ "người chỉ biết nói" thành "người biết làm". Cơ chế: AI được cung
> cấp danh sách tool (kèm mô tả), tự nhận diện khi nào cần dùng, tự tạo lời gọi với tham số đúng, và tự tổng hợp kết
> quả. Đây chính là "bàn tay" cho phép AI Agent tương tác với thế giới thực.

### 2. Agent Skills (Kỹ năng của Agent)

-   **Skill Definition:** "Skill" (Kỹ năng) của một Agent khác gì với "Knowledge" (Kiến thức)? (Ví dụ: Biết công thức
    Excel là kiến thức, nhưng khả năng tự mở file Excel lên và điền công thức vào là Kỹ năng/Tool).

> **Trả lời:**
>
> **1. Knowledge vs Skill — Sự khác biệt cốt lõi**
>
> -   **Knowledge (Kiến thức):** Thông tin mà AI "biết" — được lưu trong kiến thức nén (weights) hoặc được cung cấp qua
>     RAG. Kiến thức là "biết cái gì" (know-what).
>
>     -   _Ví dụ:_ AI biết công thức `=VLOOKUP()` trong Excel, biết cú pháp Python, biết chính sách bảo hành.
>
> -   **Skill (Kỹ năng):** Khả năng thực thi hành động trong thế giới thực thông qua Tools. Kỹ năng là "biết làm cái gì"
>     (know-how) — và quan trọng hơn, "có thể làm" (can-do).
>     -   _Ví dụ:_ AI có khả năng tự mở file Excel, điền công thức VLOOKUP vào ô đúng, chạy macro, và lưu file.
>
> **2. Ẩn dụ rõ ràng**
>
> -   **Chatbot có Knowledge:** Giống như một chuyên gia tư vấn ngồi bên điện thoại — biết mọi thứ nhưng không thể tự
>     tay làm giúp bạn. Nói "Bạn cần dùng hàm VLOOKUP như thế này..." nhưng bạn phải tự mở Excel lên gõ.
> -   **Agent có Skill:** Giống như một nhân viên thực sự — vừa biết kiến thức vừa tự tay mở Excel, gõ công thức, kiểm
>     tra kết quả, và gửi file hoàn chỉnh cho bạn.
>
> **3. Mối quan hệ giữa Knowledge và Skill**
>
> ```
> Knowledge (Biết) + Tool (Công cụ) = Skill (Kỹ năng)
> ```
>
> -   AI biết SQL (Knowledge) + có quyền truy cập database (Tool) = Skill truy vấn dữ liệu.
> -   AI biết cách viết email chuyên nghiệp (Knowledge) + có API gửi email (Tool) = Skill gửi email tự động.
> -   AI biết phân tích tài chính (Knowledge) + có quyền đọc báo cáo (Tool) + có quyền tạo biểu đồ (Tool) = Skill tạo
>     báo cáo tài chính.
>
> **4. Skill trong thực tế Agent**
>
> Một AI Agent thường có nhiều Skills, mỗi Skill là sự kết hợp của:
>
> -   **Một hoặc nhiều Tools:** Các API, hàm, hoặc hệ thống bên ngoài.
> -   **Kiến thức cách sử dụng:** AI biết khi nào dùng tool nào, với tham số gì, theo thứ tự nào.
> -   **Xử lý lỗi:** AI biết làm gì khi tool thất bại (retry, dùng tool khác, báo lỗi).
>
> _Dòng kiến thức vàng:_ Knowledge là "biết" — nằm trong bộ nhớ nén hoặc RAG. Skill là "làm được" — Knowledge + Tool +
> khả năng phối hợp. Chatbot chỉ có Knowledge (tư vấn xong bạn tự làm). Agent có cả Skill (tư vấn xong nó tự làm luôn).
> Sự khác biệt giống như giữa "sách hướng dẫn nấu ăn" và "đầu bếp biết dùng dao, chảo và bếp".

-   **Tool Use / Function Calling:** Cơ chế nào giúp một mô hình ngôn ngữ "biết" mình có kỹ năng gì để lôi ra sử dụng
    đúng lúc?

> **Trả lời:**
>
> **1. Tool Schema — "Bảng mô tả kỹ năng"**
>
> LLM không "tự biết" mình có tool nào. Nhà phát triển phải cung cấp danh sách tool dưới dạng JSON Schema — mỗi tool
> gồm: tên, mô tả chức năng, và các tham số cần thiết. Danh sách này được đưa vào System Prompt hoặc một vùng đặc biệt
> trong API call.
>
> -   _Ẩn dụ:_ Giống như đưa cho nhân viên mới một danh sách "Các phần mềm bạn được phép dùng" kèm hướng dẫn sử dụng
>     từng phần mềm. Nhân viên đọc danh sách, hiểu chức năng từng tool, rồi tự quyết định khi nào dùng tool nào.
>
> **2. Quy trình ra quyết định "dùng tool nào, khi nào"**
>
> Khi nhận được câu hỏi, LLM thực hiện chuỗi đánh giá ngầm:
>
> -   **Bước 1 — Phân tích ý định:** "Người dùng muốn gì?" → _Ví dụ:_ "Gửi email báo cáo doanh thu" → Ý định: gửi
>     email + lấy doanh thu.
> -   **Bước 2 — Đánh giá khả năng tự xử lý:** "Tôi có thể trả lời bằng kiến thức nén không?" → Doanh thu tháng này =
>     thông tin thời gian thực → Không thể.
> -   **Bước 3 — Khớp tool:** So sánh nhu cầu với description của từng tool → `get_revenue` khớp "lấy doanh thu",
>     `send_email` khớp "gửi email".
> -   **Bước 4 — Trích xuất tham số:** Phân tích câu hỏi để lấy giá trị cho parameters → `month = "current"`,
>     `to = "..."`.
> -   **Bước 5 — Xác định thứ tự:** Cần lấy doanh thu TRƯỚC, rồi mới soạn email → gọi `get_revenue` trước, `send_email`
>     sau.
>
> **3. Cơ chế kỹ thuật đằng sau**
>
> -   **Fine-tuning chuyên biệt:** Các model hỗ trợ Function Calling (GPT-4, Claude, Gemini) được fine-tuning trên hàng
>     triệu ví dụ "câu hỏi → lời gọi hàm đúng" để học cách sinh ra JSON gọi hàm thay vì văn bản thông thường.
> -   **Special Tokens:** Một số model sử dụng token đặc biệt để đánh dấu "đây là lời gọi hàm, không phải văn bản trả
>     lời". Hệ thống nhận diện token này và thực thi hàm tương ứng.
> -   **Constrained Decoding:** Khi model quyết định gọi tool, hệ thống có thể ép output tuân theo JSON Schema đã khai
>     báo, đảm bảo tham số đúng kiểu dữ liệu.
>
> **4. Ví dụ Tool Schema trong thực tế**
>
> ```json
> [
>     {
>         "name": "search_web",
>         "description": "Tìm kiếm thông tin trên Internet",
>         "parameters": {
>             "query": { "type": "string", "description": "Từ khóa tìm kiếm" }
>         }
>     },
>     {
>         "name": "run_python",
>         "description": "Chạy code Python và trả về kết quả",
>         "parameters": {
>             "code": { "type": "string", "description": "Code Python cần thực thi" }
>         }
>     }
> ]
> ```
>
> Khi người dùng hỏi "23 lũy thừa 17 bằng bao nhiêu?", AI nhận ra cần tính toán chính xác → chọn `run_python` → sinh
> `{"code": "print(23**17)"}` → nhận kết quả → trả lời.
>
> _Dòng kiến thức vàng:_ LLM "biết" tool thông qua Tool Schema — bản mô tả JSON do nhà phát triển cung cấp. Cơ chế chọn
> tool dựa trên: phân tích ý định → đánh giá khả năng tự xử lý → khớp description tool → trích xuất tham số. Model được
> fine-tuning chuyên biệt để sinh JSON gọi hàm thay vì văn bản khi nhận ra cần dùng tool.

### 3. Cơ chế hoạt động

-   **ReAct Loop:** Vòng lặp ReAct (Quan sát - Suy nghĩ - Hành động) vận hành như thế nào?

> **Trả lời:**
>
> **1. ReAct Loop trong AI Agent**
>
> Ở Module 2, chúng ta đã học ReAct Prompting như một kỹ thuật prompt. Ở Module 4, ReAct trở thành vòng lặp vận hành cốt
> lõi (core loop) của AI Agent — không còn là "kỹ thuật viết prompt" mà là "cơ chế hoạt động" tự động.
>
> **2. Vòng lặp 3 pha**
>
> ```
> ┌─→ THOUGHT (Suy nghĩ)
> │      "Tôi cần gì? Bước tiếp theo là gì?"
> │           ↓
> │    ACTION (Hành động)
> │      Gọi tool cụ thể với tham số
> │           ↓
> │    OBSERVATION (Quan sát)
> │      Nhận và phân tích kết quả từ tool
> │           ↓
> └── Đủ thông tin? → Không → Quay lại THOUGHT
>                   → Có → FINAL ANSWER
> ```
>
> **3. Ví dụ chi tiết trong Agent**
>
> Yêu cầu: "Tìm khách sạn 4 sao ở Đà Nẵng dưới 2 triệu/đêm cho ngày 15/3."
>
> -   **Thought 1:** "Tôi cần tìm danh sách khách sạn 4 sao ở Đà Nẵng."
> -   **Action 1:** `search_hotels(city="Đà Nẵng", stars=4, check_in="2025-03-15")`
> -   **Observation 1:** Trả về 15 khách sạn, giá từ 800K đến 5 triệu/đêm.
>
> -   **Thought 2:** "Cần lọc dưới 2 triệu/đêm. Có 8 khách sạn phù hợp. Nhưng tôi nên kiểm tra rating để gợi ý tốt
>     nhất."
> -   **Action 2:** `get_hotel_reviews(hotel_ids=[...8 IDs...])`
> -   **Observation 2:** 3 khách sạn có rating > 4.5/5.
>
> -   **Thought 3:** "Đã có đủ thông tin: 3 khách sạn 4 sao, dưới 2 triệu, rating cao."
> -   **Final Answer:** Gợi ý 3 khách sạn kèm giá, rating, và link đặt phòng.
>
> **4. Sự khác biệt với ReAct Prompting (Module 2)**
>
> | Đặc điểm      | ReAct Prompting (Module 2) | ReAct Loop (Module 4)             |
> | ------------- | -------------------------- | --------------------------------- |
> | Bối cảnh      | Kỹ thuật viết prompt       | Kiến trúc vận hành Agent          |
> | Thực thi tool | Mô phỏng (giả lập)         | Thực sự gọi tool                  |
> | Vòng lặp      | Giới hạn bởi prompt        | Tự động lặp cho đến khi xong      |
> | Bộ nhớ        | Chỉ Context Window         | Context Window + Long-term Memory |
>
> **5. Điều kiện dừng (Stopping Condition)**
>
> Agent cần biết khi nào dừng vòng lặp:
>
> -   Đã thu thập đủ thông tin để trả lời.
> -   Đạt giới hạn số bước tối đa (ví dụ: 10 bước) → tránh lặp vô tận.
> -   Gặp lỗi không thể khắc phục → báo cáo cho người dùng.
>
> _Dòng kiến thức vàng:_ ReAct Loop là "nhịp đập" của AI Agent — nó liên tục Suy nghĩ → Hành động → Quan sát → Suy nghĩ
> lại cho đến khi hoàn thành mục tiêu. So với ReAct Prompting ở Module 2, đây là phiên bản "thật" — tool được gọi thực
> sự, kết quả là dữ liệu thực, và vòng lặp tự động không cần con người can thiệp từng bước.

-   **Reflection & Self-Correction:** Cơ chế tự nhìn nhận và sửa lỗi (Reflection & Self-Correction) của Agent hoạt động
    ra sao?

> **Trả lời:**
>
> **1. Reflection là gì?**
>
> Reflection (Tự nhìn nhận) là khả năng Agent dừng lại sau một chuỗi hành động để tự đánh giá: "Tôi đã làm đúng chưa?
> Kết quả có hợp lý không? Cần điều chỉnh gì?" Đây là phiên bản nâng cao của Self-Critique (Module 2), nhưng áp dụng cho
> cả hành động, không chỉ văn bản.
>
> **2. Self-Correction là gì?**
>
> Self-Correction (Tự sửa lỗi) là khả năng Agent phát hiện sai sót trong kết quả của chính mình và tự động thực hiện
> hành động khắc phục — không cần con người can thiệp.
>
> **3. Quy trình Reflection & Self-Correction**
>
> ```
> Agent thực hiện chuỗi hành động
>        ↓
> REFLECTION: "Kết quả có đúng không?"
>        ↓
>   ┌── Đúng → Tiếp tục hoặc hoàn thành
>   └── Sai/Chưa tốt → SELF-CORRECTION
>                            ↓
>                  Phân tích nguyên nhân sai
>                            ↓
>                  Thử phương án khác
>                            ↓
>                  Quay lại REFLECTION
> ```
>
> **4. Ví dụ thực tế**
>
> Yêu cầu: "Viết code Python tính số Fibonacci thứ 50."
>
> -   **Action:** Agent viết code và chạy.
> -   **Observation:** Code chạy quá lâu (dùng đệ quy thuần).
> -   **Reflection:** "Code chạy quá lâu. Đệ quy thuần có độ phức tạp O(2^n) — không phù hợp cho n=50. Cần tối ưu."
> -   **Self-Correction:** Viết lại code bằng Dynamic Programming (O(n)).
> -   **Observation:** Code chạy ngay lập tức, kết quả đúng.
> -   **Reflection:** "Kết quả chính xác, hiệu suất tốt. Hoàn thành."
>
> **5. Các loại Reflection**
>
> -   **Output Reflection:** Đánh giá kết quả đầu ra. "Câu trả lời này có trả lời đúng câu hỏi không?"
> -   **Process Reflection:** Đánh giá quy trình. "Tôi có đang đi đúng hướng không? Có cách nào hiệu quả hơn?"
> -   **Error Reflection:** Phân tích khi gặp lỗi. "Tool trả về lỗi 404. Có thể URL sai. Thử tìm URL đúng."
> -   **Goal Reflection:** Kiểm tra tiến độ. "Tôi đã hoàn thành 3/5 bước. Bước tiếp theo là gì?"
>
> **6. Tại sao Reflection quan trọng?**
>
> -   **Giảm lỗi lan truyền:** Nếu bước 2 sai mà không phát hiện, bước 3, 4, 5 sẽ sai dây chuyền. Reflection giúp "cắt"
>     chuỗi sai sớm.
> -   **Tăng độ tin cậy:** Agent biết tự kiểm tra giảm nhu cầu con người giám sát mọi bước.
> -   **Thích ứng với bất ngờ:** Khi tool trả về kết quả bất ngờ (lỗi, dữ liệu trống), Agent không "đơ" mà biết phân
>     tích và thử cách khác.
>
> _Dòng kiến thức vàng:_ Reflection biến Agent từ "robot thực thi lệnh mù quáng" thành "nhân viên biết tự kiểm tra công
> việc". Self-Correction biến Agent từ "dừng khi gặp lỗi" thành "tự sửa và tiếp tục". Kết hợp cả hai tạo ra Agent đáng
> tin cậy hơn nhiều — nhưng vẫn cần Human-in-the-Loop cho các quyết định quan trọng.

-   **System 1 vs System 2:** Sự khác biệt giữa tư duy nhanh (System 1) và tư duy chậm/suy luận (System 2) trong các mô
    hình như OpenAI o1 là gì?

> **Trả lời:**
>
> **1. Nhắc lại System 1 vs System 2**
>
> Ở Module 2 (phần Chain of Thought), chúng ta đã biết lý thuyết của Daniel Kahneman:
>
> -   **System 1 (Nhanh):** Phản xạ, trực giác, không cần suy nghĩ. _Ví dụ:_ "1 + 1 = ?" → "2" ngay lập tức.
> -   **System 2 (Chậm):** Phân tích, logic, cần tập trung. _Ví dụ:_ "17 × 24 = ?" → Cần tính từng bước.
>
> **2. LLM truyền thống = System 1 thuần túy**
>
> GPT-4, Claude, Gemini khi hoạt động bình thường đều là System 1: chọn Token tiếp theo dựa trên xác suất cao nhất,
> không có bước "suy nghĩ" nội tại. Ngay cả khi dùng CoT, quá trình "suy nghĩ" vẫn là phần văn bản bên ngoài — mô hình
> không thực sự "suy nghĩ" bên trong trước khi viết.
>
> **3. Mô hình Reasoning (System 2) — OpenAI o1, o3, Claude Thinking**
>
> Các mô hình mới như OpenAI o1/o3 và Claude với Extended Thinking được thiết kế để "suy nghĩ trước khi trả lời":
>
> -   **Chain of Thought nội tại (Internal CoT):** Thay vì chỉ chọn token xác suất cao nhất, mô hình tạo ra một chuỗi
>     suy luận nội bộ (hidden reasoning) trước khi sinh câu trả lời cuối cùng.
> -   **Nhiều "bước suy nghĩ" ẩn:** Mô hình có thể "suy nghĩ" hàng nghìn token nội bộ mà người dùng không thấy, chỉ nhận
>     được kết quả cuối cùng.
> -   **Tự kiểm tra và quay lui:** Trong quá trình suy nghĩ, mô hình có thể phát hiện sai sót và thử hướng suy luận khác
>     — tương tự Tree of Thoughts nhưng diễn ra nội bộ.
>
> **4. So sánh System 1 vs System 2 trong AI**
>
> | Đặc điểm            | System 1 (GPT-4, Claude thường) | System 2 (o1, o3, Claude Thinking)    |
> | ------------------- | ------------------------------- | ------------------------------------- |
> | Tốc độ              | Nhanh (phản hồi gần tức thì)    | Chậm (có thể mất 10-60 giây suy nghĩ) |
> | Chi phí Token       | Thấp                            | Cao (nhiều token ẩn cho suy luận)     |
> | Bài toán logic/toán | Dễ sai với bài phức tạp         | Chính xác hơn đáng kể                 |
> | Bài toán sáng tạo   | Tốt (phản xạ nhanh)             | Có thể "quá phân tích"                |
> | Ảo giác             | Nhiều hơn                       | Ít hơn (có bước tự kiểm tra)          |
>
> **5. Khi nào dùng System nào?**
>
> -   **System 1 phù hợp:** Viết văn, dịch thuật, chat thông thường, brainstorm, tác vụ cần tốc độ.
> -   **System 2 phù hợp:** Bài toán logic phức tạp, lập trình khó, phân tích dữ liệu, ra quyết định cần độ chính xác
>     cao.
> -   **Agent thông minh:** Kết hợp cả hai — dùng System 1 cho các bước đơn giản (soạn email, format dữ liệu) và System
>     2 cho các bước khó (phân tích, ra quyết định, debug code).
>
> **6. Ý nghĩa cho AI Agent**
>
> Mô hình System 2 đặc biệt quan trọng cho Agent vì Agent cần ra quyết định chính xác ở mỗi bước: gọi tool nào? với tham
> số gì? kết quả có đúng không? Sai lầm ở một bước sẽ lan truyền sang tất cả bước sau. System 2 giúp Agent "suy nghĩ kỹ"
> trước mỗi hành động, giảm lỗi dây chuyền.
>
> _Dòng kiến thức vàng:_ System 1 = "phản xạ nhanh" (GPT-4, Claude thường) — tốc độ cao, chi phí thấp, phù hợp tác vụ
> đơn giản. System 2 = "suy nghĩ sâu" (o1, o3, Claude Thinking) — chậm hơn, tốn token hơn, nhưng chính xác hơn nhiều cho
> bài toán khó. Tương lai của Agent là kết hợp cả hai: nghĩ nhanh khi có thể, nghĩ sâu khi cần thiết.

### 4. Các chỉ số đo lường Agent

-   **Success Rate:** Tỷ lệ thành công (Success Rate) của Agent được đo lường như thế nào?

> **Trả lời:**
>
> **1. Success Rate là gì?**
>
> Success Rate (Tỷ lệ thành công) là phần trăm số tác vụ mà AI Agent hoàn thành đúng mục tiêu so với tổng số tác vụ được
> giao. Đây là chỉ số quan trọng nhất để đánh giá hiệu quả thực tế của Agent.
>
> ```
> Success Rate = (Số tác vụ hoàn thành đúng / Tổng số tác vụ) × 100%
> ```
>
> **2. Thách thức đo lường**
>
> Đo Success Rate của Agent phức tạp hơn nhiều so với đo chất lượng Chatbot vì:
>
> -   **Định nghĩa "thành công" không đơn giản:** "Gửi email cho sếp" — gửi được nhưng nội dung sai thì có tính thành
>     công? Gửi đúng nội dung nhưng sai người nhận?
> -   **Tác vụ nhiều bước:** Agent có thể hoàn thành 4/5 bước đúng nhưng bước cuối sai → tổng thể thất bại.
> -   **Tác vụ mở:** "Nghiên cứu đối thủ cạnh tranh" → Thế nào là "đủ tốt"? Không có đáp án chính xác.
>
> **3. Các mức độ thành công**
>
> Thay vì chỉ "thành công/thất bại", nhiều hệ thống đo theo mức:
>
> -   **Full Success (Thành công hoàn toàn):** Hoàn thành đúng mục tiêu, đúng format, không có lỗi.
> -   **Partial Success (Thành công một phần):** Hoàn thành phần lớn nhưng thiếu sót nhỏ (ví dụ: báo cáo đúng nhưng
>     thiếu 1 mục).
> -   **Failure with Recovery (Thất bại có phục hồi):** Gặp lỗi nhưng Agent tự sửa và hoàn thành sau đó.
> -   **Complete Failure (Thất bại hoàn toàn):** Không hoàn thành hoặc kết quả sai nghiêm trọng.
>
> **4. Cách đo lường trong thực tế**
>
> -   **Benchmark chuẩn hóa:** Tạo bộ 50-100 tác vụ mẫu có "đáp án đúng" xác định trước, cho Agent chạy và đánh giá tự
>     động.
> -   **Human Evaluation:** Người đánh giá xem xét kết quả Agent và chấm điểm (chính xác nhất nhưng tốn kém).
> -   **Automated Evaluation:** Dùng AI khác (ví dụ: GPT-4) để đánh giá kết quả Agent — nhanh, rẻ, nhưng không hoàn hảo.
> -   **Production Metrics:** Đo trên dữ liệu thực: tỷ lệ người dùng hài lòng, tỷ lệ cần con người can thiệp, tỷ lệ hoàn
>     thành tác vụ.
>
> **5. Benchmark phổ biến cho AI Agent**
>
> -   **SWE-bench:** Đo khả năng Agent sửa bug trong codebase thực (GitHub issues). Success Rate phổ biến: 15-50% tùy
>     model.
> -   **WebArena:** Đo khả năng Agent thao tác trên website (đặt hàng, tìm kiếm). Success Rate: 10-35%.
> -   **GAIA:** Benchmark tổng quát cho Agent với nhiều loại tác vụ. Success Rate hiện tại: 30-60%.
>
> _Dòng kiến thức vàng:_ Success Rate là "bảng thành tích" của Agent — nhưng đo lường nó không đơn giản vì tác vụ Agent
> phức tạp, nhiều bước, và định nghĩa "thành công" thường mơ hồ. Trong thực tế, nên đo theo nhiều mức
> (full/partial/failure) và kết hợp cả đánh giá tự động lẫn con người.

-   **Context Window Utilization:** Mức độ tiêu thụ ngữ cảnh của Agent có ý nghĩa gì?

> **Trả lời:**
>
> **1. Context Window Utilization là gì?**
>
> Context Window Utilization (Mức độ sử dụng cửa sổ ngữ cảnh) đo lường phần trăm Context Window mà Agent tiêu thụ trong
> quá trình thực hiện tác vụ. Đây là chỉ số quan trọng vì Context Window có giới hạn cố định (ví dụ: 128K token cho
> GPT-4, 200K cho Claude).
>
> ```
> Utilization = (Token đã dùng / Token tối đa Context Window) × 100%
> ```
>
> **2. Tại sao chỉ số này quan trọng?**
>
> -   **Context Window = "RAM" của Agent:** Mọi thứ Agent "biết" trong phiên làm việc — System Prompt, Tool Schema, lịch
>     sử hành động, kết quả tool, hội thoại — đều nằm trong Context Window. Khi đầy, Agent buộc phải "quên" thông tin
>     cũ.
>
> -   **Càng nhiều bước, càng tốn token:** Mỗi vòng ReAct Loop tiêu thụ thêm token: Thought + Action + Observation. Sau
>     10-20 vòng lặp, Context Window có thể gần đầy.
>
> -   **Khi tiêu thụ gần 100%:**
>     -   Agent bắt đầu "quên" các hành động và kết quả trước đó.
>     -   Chất lượng suy luận giảm vì mô hình phải xử lý context quá dài (hiệu ứng "Lost in the Middle").
>     -   Có thể gặp lỗi hoặc hành vi bất thường.
>
> **3. Thành phần tiêu thụ Context Window**
>
> | Thành phần                   | Token ước tính | Đặc điểm                   |
> | ---------------------------- | -------------- | -------------------------- |
> | System Prompt + Persona      | 500 - 2.000    | Cố định mỗi phiên          |
> | Tool Schema (danh sách tool) | 500 - 5.000    | Cố định, tỷ lệ với số tool |
> | Mỗi vòng ReAct Loop          | 200 - 2.000    | Tích lũy theo số bước      |
> | Kết quả tool (Observation)   | 100 - 10.000+  | Biến động lớn tùy tool     |
> | Lịch sử hội thoại            | Tích lũy       | Tăng dần theo thời gian    |
>
> **4. Cách tối ưu**
>
> -   **Tóm tắt lịch sử:** Thay vì giữ nguyên toàn bộ lịch sử, tóm tắt các bước cũ thành đoạn ngắn.
> -   **Giới hạn kết quả tool:** Chỉ lấy thông tin cần thiết, không dump toàn bộ dữ liệu.
> -   **Chia tác vụ nhỏ:** Thay vì một phiên dài, chia thành nhiều phiên nhỏ với bộ nhớ dài hạn.
> -   **Chọn model có Context Window lớn:** Claude (200K), GPT-4 (128K) cho tác vụ phức tạp nhiều bước.
>
> _Dòng kiến thức vàng:_ Context Window Utilization giống như "mức pin" của Agent — càng nhiều bước và dữ liệu, "pin"
> càng cạn. Khi gần hết, Agent bắt đầu "quên" và suy luận kém. Tối ưu bằng cách: tóm tắt lịch sử, giới hạn kết quả tool,
> và chọn model có Context Window đủ lớn cho tác vụ.

-   **Token Overhead:** Lượng Token phát sinh thêm (Token Overhead) ảnh hưởng thế nào đến chi phí?

> **Trả lời:**
>
> **1. Token Overhead là gì?**
>
> Token Overhead là lượng token "phụ" mà Agent tiêu thụ ngoài token cần thiết cho câu trả lời cuối cùng. Nó bao gồm:
> token cho suy nghĩ (Thought), token cho lời gọi tool (Action), token cho kết quả tool (Observation), token cho
> Reflection, và token cho các lần thử sai + sửa lại.
>
> ```
> Tổng token = Token câu trả lời cuối + Token Overhead (Thought + Action + Observation + Reflection)
> ```
>
> **2. Token Overhead ảnh hưởng chi phí thế nào?**
>
> Hầu hết API tính phí theo token (cả input lẫn output). Agent tiêu thụ token nhiều hơn Chatbot gấp 5-50 lần cho cùng
> một kết quả:
>
> -   **Chatbot:** Câu hỏi (50 token) → Trả lời (200 token) = 250 token tổng cộng.
> -   **Agent cùng câu hỏi:** System Prompt (1.000) + Tool Schema (2.000) + 5 vòng ReAct (5.000) + Kết quả tool
>     (3.000) + Trả lời cuối (200) = **11.200 token** tổng cộng.
>
> → Agent tốn gấp **~45 lần** token so với Chatbot cho cùng một câu trả lời.
>
> **3. Ước tính chi phí thực tế**
>
> Ví dụ với GPT-4 Turbo (~$10/1M input token, ~$30/1M output token):
>
> -   **Chatbot:** ~$0.001/câu hỏi.
> -   **Agent đơn giản (3-5 bước):** ~$0.05-0.10/tác vụ.
> -   **Agent phức tạp (10-20 bước):** ~$0.50-2.00/tác vụ.
> -   **Agent dùng model System 2 (o1):** ~$2-10/tác vụ (token ẩn cho suy luận).
>
> **4. Cách giảm Token Overhead**
>
> -   **Giới hạn số bước:** Đặt max_steps hợp lý (ví dụ: 10 bước). Nếu Agent không xong trong 10 bước, dừng và báo cáo
>     thay vì lặp vô tận.
> -   **Tóm tắt Observation:** Thay vì giữ nguyên toàn bộ kết quả tool (có thể rất dài), tóm tắt trước khi đưa vào
>     context.
> -   **Chọn model phù hợp:** Dùng model nhỏ/rẻ (GPT-4o-mini, Claude Haiku) cho các bước đơn giản, model lớn cho bước
>     quyết định quan trọng.
> -   **Caching:** Lưu cache kết quả tool đã gọi, tránh gọi lại tool cùng tham số.
> -   **Tối ưu Tool Schema:** Chỉ cung cấp tool cần thiết cho tác vụ cụ thể, không load toàn bộ 50 tool cho mỗi câu hỏi.
>
> **5. Token Overhead vs Giá trị tạo ra**
>
> Token Overhead là chi phí cần thiết để Agent "suy nghĩ và hành động". Quan trọng là đánh giá ROI (Return on
> Investment): nếu Agent tốn $1 token nhưng tiết kiệm 2 giờ làm việc của nhân viên → hoàn toàn xứng đáng.
>
> _Dòng kiến thức vàng:_ Token Overhead là "chi phí suy nghĩ" của Agent — mỗi vòng ReAct, mỗi lần gọi tool, mỗi lần
> Reflection đều tốn token và tiền. Agent có thể tốn gấp 10-50 lần Chatbot cho cùng kết quả. Tối ưu bằng: giới hạn bước,
> tóm tắt observation, chọn model phù hợp. Nhưng đừng quên: chi phí token thường rẻ hơn nhiều so với chi phí nhân sự mà
> Agent thay thế.

-   **HITL (Human-in-the-Loop):** Tại sao con người (HITL) luôn cần là chốt chặn cuối cùng trong hệ thống tự động?

> **Trả lời:**
>
> **1. HITL (Human-in-the-Loop) là gì?**
>
> Human-in-the-Loop (Con người trong vòng lặp) là nguyên tắc thiết kế hệ thống AI Agent trong đó con người đóng vai trò
> giám sát, phê duyệt, hoặc can thiệp tại các điểm quyết định quan trọng, thay vì để Agent hoàn toàn tự chủ.
>
> **2. Tại sao HITL luôn cần thiết?**
>
> -   **AI Agent không hoàn hảo:** Ngay cả Agent tốt nhất hiện nay cũng chỉ đạt 30-60% Success Rate trên các benchmark
>     phức tạp. Để Agent tự chủ 100% với các tác vụ quan trọng là rủi ro lớn.
>
> -   **Hành động không thể hoàn tác:** Chatbot trả lời sai thì sửa lại. Nhưng Agent gửi email sai, xóa file sai, đặt
>     hàng sai → hậu quả không dễ đảo ngược.
>
> -   **Ảo giác + Hành động = Nguy hiểm kép:** Một Chatbot bị ảo giác chỉ đưa ra thông tin sai (người dùng có thể nhận
>     ra). Một Agent bị ảo giác sẽ thực hiện hành động dựa trên thông tin sai → gây thiệt hại thực tế.
>
> -   **Trách nhiệm pháp lý:** Khi Agent ra quyết định sai gây thiệt hại, ai chịu trách nhiệm? Hiện tại, con người vẫn
>     là người chịu trách nhiệm cuối cùng → con người phải có quyền kiểm soát.
>
> **3. Các mức độ HITL**
>
> -   **Full Automation (Tự động hoàn toàn):** Agent tự làm mọi thứ, chỉ thông báo kết quả. _Phù hợp:_ Tác vụ rủi ro
>     thấp, dễ hoàn tác (ví dụ: tóm tắt email, phân loại ticket).
>
> -   **Approval-based (Phê duyệt trước):** Agent lập kế hoạch và đề xuất hành động, nhưng chờ con người phê duyệt trước
>     khi thực hiện. _Phù hợp:_ Tác vụ rủi ro trung bình (ví dụ: gửi email cho khách, tạo báo cáo).
>
> -   **Supervised (Giám sát liên tục):** Con người theo dõi mọi bước và có thể can thiệp bất cứ lúc nào. _Phù hợp:_ Tác
>     vụ rủi ro cao (ví dụ: giao dịch tài chính, quyết định y tế).
>
> -   **Full Manual with AI Assist (Thủ công có AI hỗ trợ):** Con người làm chính, AI chỉ gợi ý và hỗ trợ. _Phù hợp:_
>     Tác vụ cực kỳ nhạy cảm (ví dụ: quyết định pháp lý).
>
> **4. Thiết kế HITL hiệu quả**
>
> -   **Xác định "điểm chốt":** Không cần phê duyệt mọi bước (tốn thời gian), chỉ cần phê duyệt tại các điểm quyết định
>     quan trọng.
>
>     -   _Ví dụ:_ Agent nghiên cứu thông tin (tự động) → soạn email (tự động) → **CHỐT: Con người duyệt email** → gửi
>         email.
>
> -   **Cung cấp đủ ngữ cảnh:** Khi hỏi ý kiến con người, Agent phải trình bày rõ: đã làm gì, tại sao đề xuất hành động
>     này, các phương án thay thế.
>
> -   **Cho phép ghi đè:** Con người phải có khả năng hủy, sửa, hoặc thay đổi hành động của Agent bất cứ lúc nào.
>
> **5. Tương lai: Giảm dần HITL**
>
> Khi AI Agent ngày càng đáng tin cậy hơn, mức độ HITL sẽ giảm dần — giống như xe tự lái: từ Level 2 (người lái phải
> giám sát) → Level 5 (hoàn toàn tự chủ). Nhưng với công nghệ hiện tại, HITL vẫn là yếu tố bắt buộc cho bất kỳ Agent nào
> xử lý tác vụ có rủi ro.
>
> _Dòng kiến thức vàng:_ HITL là "phanh tay" của hệ thống Agent — cho phép con người dừng, sửa, hoặc ghi đè quyết định
> AI tại các điểm quan trọng. Tại sao luôn cần? Vì Agent chưa đủ tin cậy (30-60% success rate), hành động sai khó hoàn
> tác, và trách nhiệm pháp lý cuối cùng vẫn thuộc về con người. Nguyên tắc: tự động khi rủi ro thấp, phê duyệt khi rủi
> ro trung bình, giám sát khi rủi ro cao.

