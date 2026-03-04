# AI Training Curriculum

> **Lưu ý:** Các dòng chữ tô đỏ thì đội tech bắt buộc phải học, còn với các nhân sự khác có thể học hoặc bỏ qua.

---

## MODULE 5: KẾT NỐI HỆ THỐNG (MCP & INTEGRATION)

### 1. Model Context Protocol (MCP)

-   **Model Context Protocol (MCP):** Giao thức MCP là gì và nó giải quyết vấn đề "M x N" trong kết nối dữ liệu như thế
    nào?

> **Trả lời:**
>
> **1. MCP (Model Context Protocol) là gì?**
>
> MCP là một giao thức mở (open protocol) được Anthropic giới thiệu, tạo ra cách thức tiêu chuẩn để các ứng dụng AI
> (LLM) kết nối với các nguồn dữ liệu và công cụ bên ngoài. Nó đóng vai trò như một "ngôn ngữ chung" mà mọi AI và mọi
> nguồn dữ liệu đều hiểu.
>
> -   _Ẩn dụ:_ MCP giống như cổng USB-C — trước khi có USB-C, mỗi thiết bị dùng một loại cáp riêng (Lightning,
>     Micro-USB, Mini-USB). USB-C tạo ra một chuẩn duy nhất cho tất cả. MCP làm điều tương tự cho kết nối AI.
>
> **2. Vấn đề "M × N" là gì?**
>
> Trước MCP, mỗi ứng dụng AI (M) muốn kết nối với mỗi nguồn dữ liệu (N) phải xây dựng một integration riêng biệt:
>
> -   **M ứng dụng AI:** ChatGPT, Claude, Gemini, các AI nội bộ...
> -   **N nguồn dữ liệu:** Google Drive, Slack, GitHub, Notion, CRM, Database, Email...
> -   **Số integration cần xây dựng:** M × N
>
> _Ví dụ:_ 5 ứng dụng AI × 10 nguồn dữ liệu = 50 integration khác nhau. Mỗi integration cần code riêng, bảo trì riêng,
> cập nhật riêng. Khi thêm 1 nguồn dữ liệu mới, phải xây thêm 5 integration.
>
> **3. MCP giải quyết vấn đề "M × N" thành "M + N"**
>
> Với MCP, mỗi bên chỉ cần triển khai giao thức MCP một lần:
>
> -   Mỗi ứng dụng AI triển khai MCP Client (1 lần) → kết nối được với TẤT CẢ MCP Server.
> -   Mỗi nguồn dữ liệu triển khai MCP Server (1 lần) → được TẤT CẢ AI truy cập.
> -   **Số integration:** M + N (thay vì M × N).
>
> _Ví dụ:_ 5 AI + 10 nguồn dữ liệu = 15 implementation (thay vì 50). Khi thêm 1 nguồn dữ liệu mới, chỉ cần xây 1 MCP
> Server → tự động hoạt động với tất cả 5 AI.
>
> ```
> TRƯỚC MCP (M × N):              SAU MCP (M + N):
>
> AI₁ ──┬── Data₁                 AI₁ ──┐
> AI₁ ──┤── Data₂                 AI₂ ──┼── [MCP Protocol] ──┬── Data₁
> AI₂ ──┤── Data₁                 AI₃ ──┘                    ├── Data₂
> AI₂ ──┤── Data₂                                            └── Data₃
> AI₃ ──┤── Data₁
> AI₃ ──┴── Data₂                 15 implementations
> = 6 implementations riêng biệt  (và dễ mở rộng!)
> ```
>
> **4. MCP cung cấp những gì?**
>
> MCP định nghĩa 3 loại khả năng mà một MCP Server có thể cung cấp:
>
> -   **Tools (Công cụ):** Các hành động Agent có thể thực hiện — giống Function Calling (Module 4). _Ví dụ:_ >
>     `send_email()`, `create_ticket()`, `search_documents()`.
> -   **Resources (Tài nguyên):** Dữ liệu mà Agent có thể đọc — tương tự GET request. _Ví dụ:_ nội dung file, bản ghi
>     database, tài liệu.
> -   **Prompts (Gợi ý):** Các prompt template được định nghĩa sẵn để hướng dẫn AI cách sử dụng server một cách tối ưu.
>
> _Dòng kiến thức vàng:_ MCP là "USB-C cho AI" — biến bài toán kết nối M × N (mỗi AI phải tự kết nối từng nguồn dữ liệu)
> thành M + N (mỗi bên chỉ cần triển khai giao thức một lần). Đây là bước tiến quan trọng giúp hệ sinh thái AI Agent
> phát triển mạnh mẽ vì giảm đáng kể chi phí và công sức tích hợp.

-   **MCP Components:** Vai trò của MCP Host, MCP Client và MCP Server là gì?

> **Trả lời:**
>
> **1. Kiến trúc MCP 3 thành phần**
>
> MCP hoạt động theo mô hình Client-Server với 3 vai trò rõ ràng:
>
> ```
> ┌─────────────────────────────────────────────┐
> │              MCP HOST                        │
> │  (Ứng dụng AI: Claude Desktop, IDE, App)    │
> │                                              │
> │  ┌──────────────┐  ┌──────────────┐         │
> │  │ MCP Client 1 │  │ MCP Client 2 │  ...    │
> │  └──────┬───────┘  └──────┬───────┘         │
> └─────────┼─────────────────┼─────────────────┘
>           │                 │
>    ┌──────┴──────┐   ┌──────┴──────┐
>    │ MCP Server  │   │ MCP Server  │
>    │ (GitHub)    │   │ (Slack)     │
>    └──────┬──────┘   └──────┬──────┘
>           │                 │
>    ┌──────┴──────┐   ┌──────┴──────┐
>    │  GitHub API │   │  Slack API  │
>    └─────────────┘   └─────────────┘
> ```
>
> **2. MCP Host — "Ngôi nhà" chứa mọi thứ**
>
> -   **Vai trò:** Là ứng dụng AI mà người dùng tương tác trực tiếp. Host chứa LLM (Brain) và quản lý các MCP Client bên
>     trong nó.
> -   **Ví dụ:** Claude Desktop, VS Code + Continue, Cursor IDE, hoặc ứng dụng AI nội bộ của công ty bạn.
> -   **Trách nhiệm:**
>     -   Quản lý vòng đời của các MCP Client (khởi tạo, dừng).
>     -   Cung cấp giao diện cho người dùng.
>     -   Gửi yêu cầu từ LLM đến đúng MCP Client.
>
> **3. MCP Client — "Người phiên dịch"**
>
> -   **Vai trò:** Là thành phần nằm bên trong Host, duy trì kết nối 1:1 với một MCP Server cụ thể. Mỗi MCP Server có
>     một MCP Client riêng.
> -   **Trách nhiệm:**
>     -   Thiết lập và duy trì kết nối với MCP Server.
>     -   Gửi yêu cầu từ Host (LLM) đến Server theo đúng giao thức MCP.
>     -   Nhận kết quả từ Server và trả về cho Host.
>     -   Đảm bảo bảo mật và quyền truy cập.
>
> **4. MCP Server — "Cầu nối đến dữ liệu"**
>
> -   **Vai trò:** Là chương trình nhẹ (lightweight program) đóng vai trò trung gian giữa giao thức MCP và một nguồn dữ
>     liệu/dịch vụ cụ thể.
> -   **Mỗi MCP Server "bọc" một nguồn dữ liệu:** GitHub MCP Server bọc GitHub API, Slack MCP Server bọc Slack API,
>     Database MCP Server bọc kết nối database.
> -   **Cung cấp 3 loại khả năng:**
>     -   **Tools:** Các hành động (đọc file, tạo issue, gửi tin nhắn).
>     -   **Resources:** Dữ liệu có thể đọc (nội dung repo, danh sách channel).
>     -   **Prompts:** Template hướng dẫn AI sử dụng server hiệu quả.
> -   **Ví dụ cụ thể:** MCP Server cho Figma cung cấp tool `get_design_context` để AI đọc thiết kế Figma, tool
>     `get_screenshot` để chụp ảnh node — AI dùng các tool này để chuyển đổi thiết kế thành code.
>
> **5. Luồng hoạt động**
>
> 1. Người dùng hỏi: "Tạo issue trên GitHub cho bug login."
> 2. **Host** nhận câu hỏi, gửi cho LLM.
> 3. LLM nhận ra cần dùng tool `create_issue` từ GitHub MCP Server.
> 4. **MCP Client** (cho GitHub) gửi yêu cầu đến **MCP Server** (GitHub).
> 5. MCP Server gọi GitHub API, tạo issue, trả kết quả.
> 6. Kết quả truyền ngược: Server → Client → Host → LLM → Trả lời người dùng.
>
> _Dòng kiến thức vàng:_ MCP Host là "ngôi nhà" (ứng dụng AI), MCP Client là "người phiên dịch" (nằm trong Host, kết nối
> 1:1 với Server), MCP Server là "cầu nối" (bọc nguồn dữ liệu thành giao thức chuẩn). Mô hình này cho phép một Host kết
> nối với hàng chục Server khác nhau đồng thời, mỗi Server mở ra một khả năng mới cho AI Agent.

### 2. Giao diện & Tương tác

-   **Web Interface vs API:** Khi nào nên dùng giao diện Web và khi nào cần tích hợp qua API?

> **Trả lời:**
>
> **1. Web Interface — Giao diện trên trình duyệt**
>
> Web Interface là cách tương tác với AI thông qua giao diện đồ họa trên trình duyệt (ví dụ: chat.openai.com,
> claude.ai). Người dùng gõ câu hỏi, AI trả lời trực tiếp trên màn hình.
>
> -   **Ưu điểm:**
>
>     -   Dễ sử dụng, không cần kiến thức kỹ thuật.
>     -   Sẵn sàng ngay (không cần cài đặt, cấu hình).
>     -   Có giao diện quản lý lịch sử hội thoại.
>
> -   **Nhược điểm:**
>     -   Thao tác thủ công (phải copy-paste dữ liệu).
>     -   Không tự động hóa được (không thể lên lịch chạy tự động).
>     -   Giới hạn tùy chỉnh (phải dùng giao diện có sẵn).
>
> **2. API — Kết nối bằng code**
>
> API (Application Programming Interface) cho phép ứng dụng của bạn giao tiếp trực tiếp với AI bằng code, không cần giao
> diện. Bạn gửi HTTP request chứa prompt, nhận response chứa câu trả lời.
>
> -   **Ưu điểm:**
>
>     -   Tự động hóa hoàn toàn (chạy theo lịch, trigger sự kiện).
>     -   Tích hợp vào sản phẩm/hệ thống (chatbot trên website, trợ lý trong app).
>     -   Kiểm soát toàn bộ (System Prompt, Temperature, model, format output).
>     -   Xử lý hàng loạt (batch processing hàng nghìn yêu cầu).
>
> -   **Nhược điểm:**
>     -   Cần kiến thức lập trình.
>     -   Phải tự xây giao diện nếu muốn người dùng cuối tương tác.
>     -   Chi phí theo usage (trả tiền theo token sử dụng).
>
> **3. Khi nào dùng gì?**
>
> | Tình huống                    | Web Interface | API         |
> | ----------------------------- | ------------- | ----------- |
> | Cá nhân dùng hàng ngày        | Phù hợp       | Không cần   |
> | Brainstorm, viết nội dung     | Phù hợp       | Không cần   |
> | Chatbot trên website công ty  | Không phù hợp | Bắt buộc    |
> | Tự động xử lý email hàng ngày | Không phù hợp | Bắt buộc    |
> | Tích hợp AI vào app mobile    | Không phù hợp | Bắt buộc    |
> | Xử lý 1.000 đơn hàng/ngày     | Không phù hợp | Bắt buộc    |
> | Prototype nhanh, thử nghiệm   | Phù hợp       | Có thể dùng |
>
> **4. Mối liên hệ với MCP**
>
> MCP nằm ở tầng API — nó chuẩn hóa cách AI (qua API) kết nối với các dịch vụ bên ngoài. Khi bạn xây dựng AI Agent tích
> hợp vào hệ thống, bạn sẽ dùng API để giao tiếp với LLM và MCP để kết nối LLM với các nguồn dữ liệu.
>
> _Dòng kiến thức vàng:_ Web Interface = "dùng tay" — nhanh, dễ, phù hợp cá nhân. API = "dùng code" — tự động, tích hợp,
> phù hợp doanh nghiệp. Quy tắc đơn giản: nếu có từ "tự động", "tích hợp", "hàng loạt", hoặc "sản phẩm" → cần API. Nếu
> chỉ "hỏi đáp cá nhân" → Web Interface là đủ.

-   **SLM (Small Language Models):** Mô hình ngôn ngữ nhỏ (SLM) là gì và lợi ích của việc chạy on-device?

> **Trả lời:**
>
> **1. SLM (Small Language Models) là gì?**
>
> SLM là các mô hình ngôn ngữ có kích thước nhỏ hơn đáng kể so với LLM, thường từ 1 đến 13 tỷ tham số (so với 175B+ của
> GPT-4, 400B+ của LLaMA 3.1 lớn nhất). SLM được thiết kế để chạy trên thiết bị cá nhân (laptop, điện thoại, edge
> device) thay vì cần server đám mây có GPU mạnh.
>
> **Ví dụ SLM phổ biến:**
>
> -   **Microsoft Phi-3/Phi-4:** 3.8B - 14B tham số, hiệu suất ấn tượng cho kích thước.
> -   **Google Gemma/Gemini Nano:** 2B - 9B, tối ưu cho mobile và edge.
> -   **Meta LLaMA 3.2 (1B, 3B):** Phiên bản nhỏ của dòng LLaMA.
> -   **Mistral 7B:** Mô hình 7B tham số với hiệu suất vượt trội.
> -   **Apple OpenELM:** Tối ưu cho hệ sinh thái Apple.
>
> **2. Lợi ích chạy On-device (Trên thiết bị)**
>
> -   **Bảo mật dữ liệu tuyệt đối:** Dữ liệu không bao giờ rời khỏi thiết bị — không gửi lên cloud, không qua API. Hoàn
>     hảo cho dữ liệu nhạy cảm (y tế, tài chính, quân sự, cá nhân).
> -   **Không cần Internet:** Hoạt động offline hoàn toàn. Phù hợp cho vùng xa, thiết bị nhúng, hoặc môi trường bảo mật
>     cao.
> -   **Độ trễ cực thấp (Low Latency):** Không cần gửi request đến server và chờ response → phản hồi gần tức thì. Quan
>     trọng cho ứng dụng thời gian thực (voice assistant, autocomplete).
> -   **Chi phí vận hành = 0:** Không trả tiền API theo token. Chỉ cần phần cứng một lần. Phù hợp cho ứng dụng có lượng
>     request lớn nhưng ngân sách thấp.
> -   **Tùy chỉnh hoàn toàn:** Có thể fine-tuning trên thiết bị với dữ liệu riêng mà không cần chia sẻ dữ liệu với bên
>     thứ ba.
>
> **3. Hạn chế của SLM**
>
> -   **Năng lực suy luận kém hơn LLM:** Với bài toán phức tạp, logic nhiều bước, hoặc cần kiến thức sâu → SLM thua LLM
>     rõ rệt.
> -   **Kiến thức hẹp hơn:** Ít tham số = ít "dung lượng" để nén kiến thức thế giới.
> -   **Không phù hợp cho mọi tác vụ:** Viết code phức tạp, phân tích dài, sáng tạo nội dung chuyên sâu → vẫn cần LLM.
>
> **4. Khi nào dùng SLM vs LLM?**
>
> | Tình huống                                | SLM (On-device) | LLM (Cloud)   |
> | ----------------------------------------- | --------------- | ------------- |
> | Dữ liệu nhạy cảm                          | Ưu tiên         | Cần cẩn trọng |
> | Offline / vùng xa                         | Bắt buộc        | Không khả thi |
> | Tác vụ đơn giản (phân loại, tóm tắt ngắn) | Phù hợp         | Quá tốn kém   |
> | Tác vụ phức tạp (phân tích, sáng tạo)     | Hạn chế         | Ưu tiên       |
> | Budget hạn chế, lượng request lớn         | Ưu tiên         | Tốn kém       |
>
> _Dòng kiến thức vàng:_ SLM là "AI bỏ túi" — nhỏ gọn, chạy trên thiết bị, bảo mật tuyệt đối, không cần Internet, chi
> phí gần zero. Đánh đổi: năng lực kém hơn LLM cho tác vụ phức tạp. Xu hướng tương lai là "hybrid": SLM xử lý tác vụ đơn
> giản tại chỗ, LLM xử lý tác vụ khó trên cloud — tối ưu cả chi phí lẫn hiệu suất.

-   **AI Automation Workflow:** Sự kết hợp giữa AI và các công cụ tự động hóa (No-code Automation) giúp loại bỏ các tác
    vụ thủ công như thế nào? (Ví dụ: Tự động tóm tắt email và lưu vào Notion).

> **Trả lời:**
>
> **1. Automation truyền thống vs AI Automation**
>
> Trước khi AI xuất hiện, automation đã tồn tại dưới dạng **rule-based workflow** — "nếu X thì làm Y". Ví dụ: khi nhận
> email có attachment → tự động lưu file vào Google Drive. Nhưng automation truyền thống chỉ xử lý được tác vụ **có cấu
> trúc rõ ràng**, không hiểu ngữ cảnh.
>
> AI Automation bổ sung **"bộ não"** vào workflow — có khả năng đọc hiểu, phân loại, tóm tắt, ra quyết định dựa trên nội
> dung. Kết hợp cả hai tạo ra hệ thống vừa **thông minh** (AI) vừa **tự động** (Automation).
>
> | Tiêu chí   | Automation truyền thống    | AI Automation                                               |
> | ---------- | -------------------------- | ----------------------------------------------------------- |
> | Logic      | If-then cứng nhắc          | Hiểu ngữ cảnh, linh hoạt                                    |
> | Input      | Có cấu trúc (JSON, form)   | Phi cấu trúc (email, ảnh, giọng nói)                        |
> | Quyết định | Theo rule cố định          | Phân loại, suy luận                                         |
> | Ví dụ      | "Khi nhận email → forward" | "Đọc email → tóm tắt → phân loại urgent/normal → gửi Slack" |
>
> **2. Kiến trúc AI Automation Workflow**
>
> Một workflow AI Automation điển hình gồm 3 lớp:
>
> ```
> ┌─────────────────────────────────────────────┐
> │            TRIGGER (Kích hoạt)              │
> │  Email mới / Webhook / Schedule / Form      │
> └──────────────────┬──────────────────────────┘
>                    ▼
> ┌─────────────────────────────────────────────┐
> │           AI PROCESSING (Xử lý AI)          │
> │  LLM: Đọc → Hiểu → Tóm tắt → Phân loại    │
> │  Vision: Đọc ảnh/PDF → Trích xuất dữ liệu  │
> │  Speech: Nghe audio → Chuyển thành text      │
> └──────────────────┬──────────────────────────┘
>                    ▼
> ┌─────────────────────────────────────────────┐
> │           ACTION (Hành động)                │
> │  Lưu Notion / Gửi Slack / Update CRM       │
> │  Tạo task Trello / Gửi email phản hồi      │
> └─────────────────────────────────────────────┘
> ```
>
> **3. Các nền tảng No-code Automation phổ biến**
>
> -   **Zapier**: Nền tảng lâu đời nhất, 7000+ app integrations, có AI actions tích hợp (Summarize, Classify, Extract)
> -   **Make (Integromat)**: Visual workflow builder mạnh, hỗ trợ branching phức tạp, HTTP module gọi API LLM trực tiếp
> -   **n8n**: Open-source, self-hosted, có AI Agent node tích hợp sẵn (LangChain), kiểm soát data hoàn toàn
> -   **Power Automate**: Hệ sinh thái Microsoft, tích hợp sâu Office 365/Teams/SharePoint, có AI Builder
> -   **Activepieces**: Open-source alternative cho Zapier, giao diện đơn giản, community-driven
>
> **4. Ví dụ thực tế: Tự động tóm tắt email và lưu vào Notion**
>
> Workflow chi tiết trên Make/n8n:
>
> ```
> [Gmail Trigger]          → Khi nhận email mới
>       ↓
> [Filter]                 → Chỉ email từ @client.com hoặc label "Important"
>       ↓
> [OpenAI/Claude Module]   → Prompt: "Tóm tắt email sau trong 3 bullet points.
>                             Trích xuất: Người gửi, Chủ đề chính, Action items.
>                             Phân loại: urgent/normal/fyi"
>       ↓
> [Router/Branch]          → Nếu urgent → gửi Slack notification
>                          → Nếu có action items → tạo task Todoist
>       ↓
> [Notion API]             → Tạo page mới trong database "Email Summaries"
>                             Properties: Date, From, Summary, Category, Status
> ```
>
> **5. Các pattern AI Automation phổ biến**
>
> | Pattern                 | Mô tả                                            | Ví dụ                                                   |
> | ----------------------- | ------------------------------------------------ | ------------------------------------------------------- |
> | **Summarize & Store**   | AI tóm tắt → lưu trữ có tổ chức                  | Email → Notion, Meeting transcript → Wiki               |
> | **Classify & Route**    | AI phân loại → điều hướng đúng người/kênh        | Support ticket → phân loại → assign team                |
> | **Extract & Transform** | AI trích xuất dữ liệu từ phi cấu trúc → cấu trúc | Invoice PDF → extract fields → Google Sheets            |
> | **Generate & Send**     | AI tạo nội dung → gửi tự động                    | Customer review → AI draft reply → send email           |
> | **Monitor & Alert**     | AI theo dõi → cảnh báo khi bất thường            | Social mention → sentiment analysis → alert if negative |
>
> **6. Ví dụ nâng cao: AI Customer Support Pipeline**
>
> ```
> [Webhook: Ticket mới từ Zendesk]
>       ↓
> [AI: Phân tích sentiment + phân loại vấn đề]
>       ↓
> [Branch theo category]
>   ├── Billing → Auto-reply với template + link thanh toán
>   ├── Technical → RAG search knowledge base → draft solution
>   ├── Complaint → Escalate → Slack notify manager
>   └── General → AI generate reply → human review queue
>       ↓
> [Log vào Google Sheets + Update CRM]
> ```
>
> **7. Lưu ý khi triển khai AI Automation**
>
> -   **Human-in-the-Loop**: Với tác vụ quan trọng (gửi email cho khách, ra quyết định tài chính), luôn có bước review
>     của người trước khi thực thi
> -   **Error handling**: AI có thể hallucinate — cần validation layer, fallback khi AI response không hợp lệ
> -   **Rate limiting & Cost**: Mỗi lần gọi LLM tốn token → cần tính toán chi phí khi workflow chạy hàng nghìn lần/ngày
> -   **Data privacy**: Dữ liệu đi qua LLM API → cân nhắc PII (Personally Identifiable Information), dùng SLM on-premise
>     nếu cần
> -   **Idempotency**: Workflow phải xử lý được trường hợp chạy lại (retry) mà không tạo duplicate data
>
> **8. Xu hướng: AI Agent + Automation = Agentic Workflow**
>
> Bước tiến tiếp theo là **Agentic Automation** — thay vì workflow cố định (linear), AI Agent tự quyết định workflow dựa
> trên context:
>
> ```
> Automation truyền thống:  A → B → C → D (cố định)
> AI Automation:            A → [AI xử lý] → C → D (AI ở 1 bước)
> Agentic Automation:       [Agent tự quyết định] → A hoặc B hoặc C (linh hoạt)
> ```
>
> Ví dụ: Nhận email → Agent tự đánh giá: "Email này cần reply ngay, tạo task, hay chỉ archive?" → tự thực hiện action
> phù hợp mà không cần rule cứng.
>
> _Dòng kiến thức vàng:_ AI Automation = "Bộ não AI" + "Đôi tay Automation". AI đọc hiểu, phân loại, tóm tắt, ra quyết
> định — Automation thực thi, kết nối, lưu trữ, thông báo. Kết hợp cả hai biến tác vụ thủ công 30 phút thành workflow tự
> động 30 giây. Chìa khóa: bắt đầu từ workflow đơn giản (Summarize & Store), chứng minh giá trị, rồi mở rộng dần. Luôn
> giữ Human-in-the-Loop cho quyết định quan trọng.

