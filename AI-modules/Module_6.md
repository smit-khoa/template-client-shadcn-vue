# AI Training Curriculum

> **Lưu ý:** Các dòng chữ tô đỏ thì đội tech bắt buộc phải học, còn với các nhân sự khác có thể học hoặc bỏ qua.

---

## MODULE 6: HỆ THỐNG ĐA TÁC NHÂN (MULTI-AGENT SYSTEM - MAS)

### 1. Các mô hình phối hợp

-   Khái niệm Agent-to-Agent (A2A) là gì?

> **Trả lời:**
>
> **1. Từ Single Agent đến Multi-Agent**
>
> Ở Module 4, ta đã học về AI Agent đơn lẻ — một "nhân viên AI" có Brain, Memory, Tools, Planning. Nhưng khi tác vụ phức
> tạp vượt quá năng lực một agent (ví dụ: xây dựng một ứng dụng hoàn chỉnh cần frontend + backend + testing +
> deployment), ta cần **nhiều agent phối hợp** — đó là Multi-Agent System (MAS).
>
> **Ẩn dụ:** Single Agent = một nhân viên giỏi. Multi-Agent = một công ty với nhiều phòng ban chuyên môn, mỗi phòng ban
> là một agent.
>
> **2. Agent-to-Agent (A2A) là gì?**
>
> A2A là **giao thức giao tiếp** cho phép các AI Agent từ các hệ thống/vendor khác nhau tương tác, trao đổi thông tin và
> phối hợp thực hiện tác vụ. Đây là protocol do Google đề xuất (04/2025), bổ sung cho MCP (đã học ở Module 5).
>
> -   **MCP** (Module 5): Agent ↔ Tool/Data — agent kết nối với công cụ và dữ liệu bên ngoài
> -   **A2A**: Agent ↔ Agent — các agent nói chuyện với nhau, ủy quyền tác vụ, chia sẻ kết quả
>
> ```
> ┌──────────────────────────────────────────────┐
> │              MCP vs A2A                       │
> │                                               │
> │   MCP:   Agent ←──→ Tools/Data               │
> │          (Agent dùng công cụ)                 │
> │                                               │
> │   A2A:   Agent ←──→ Agent ←──→ Agent         │
> │          (Agent phối hợp với nhau)            │
> └──────────────────────────────────────────────┘
> ```
>
> **3. Các thành phần cốt lõi của A2A**
>
> -   **Agent Card**: "Danh thiếp" của mỗi agent — mô tả tên, khả năng, endpoint, authentication. Các agent đọc Agent
>     Card để biết ai làm được gì
> -   **Task**: Đơn vị công việc — một agent gửi task cho agent khác, theo dõi trạng thái (submitted → working →
>     completed/failed)
> -   **Message**: Tin nhắn trao đổi giữa các agent trong quá trình thực hiện task
> -   **Artifact**: Kết quả đầu ra của task (file, data, report) mà agent trả về cho agent yêu cầu
>
> **4. Luồng hoạt động A2A**
>
> ```
> Agent A (Client)                    Agent B (Remote)
>     │                                    │
>     │──── Đọc Agent Card B ────────────→│
>     │←─── Trả về: capabilities, URL ────│
>     │                                    │
>     │──── Gửi Task: "Phân tích data" ──→│
>     │←─── Status: "working" ────────────│
>     │                                    │
>     │←─── Message: "Cần thêm info..." ──│
>     │──── Message: "Đây là dataset" ───→│
>     │                                    │
>     │←─── Artifact: report.pdf ─────────│
>     │←─── Status: "completed" ──────────│
> ```
>
> **5. Tại sao cần A2A?**
>
> -   **Chuyên môn hóa**: Mỗi agent giỏi một lĩnh vực — agent code, agent test, agent deploy — phối hợp tốt hơn một
>     agent "biết tuốt"
> -   **Khả năng mở rộng**: Thêm agent mới mà không cần sửa agent cũ
> -   **Vendor-agnostic**: Agent của Google có thể nói chuyện với agent của OpenAI, Anthropic — miễn tuân thủ protocol
> -   **Song song hóa**: Nhiều agent làm việc đồng thời, giảm thời gian hoàn thành
>
> _Dòng kiến thức vàng:_ A2A là "ngôn ngữ chung" để các AI Agent giao tiếp — giống như HTTP cho web, SMTP cho email. MCP
> kết nối Agent với Tools, A2A kết nối Agent với Agent. Khi cả hai protocol phổ biến, ta sẽ có hệ sinh thái AI Agent
> liên thông — bất kỳ agent nào cũng có thể phối hợp với bất kỳ agent nào khác, bất kể vendor hay nền tảng.

-   **Hierarchical Model:** Mô hình phân cấp (Hierarchical) với Agent sếp và nhân viên hoạt động như thế nào?

> **Trả lời:**
>
> **1. Khái niệm Hierarchical Model**
>
> Mô hình phân cấp là kiến trúc Multi-Agent trong đó có **một Agent "sếp" (Orchestrator/Manager)** điều phối nhiều
> **Agent "nhân viên" (Worker)**. Sếp nhận yêu cầu tổng, phân tách thành subtask, giao cho worker phù hợp, thu thập kết
> quả, và tổng hợp đáp án cuối cùng.
>
> **Ẩn dụ:** Giám đốc dự án nhận brief từ khách hàng → phân công designer làm UI, developer làm code, tester kiểm thử →
> thu thập deliverables → gửi sản phẩm hoàn chỉnh cho khách.
>
> **2. Kiến trúc**
>
> ```
>                    ┌──────────────┐
>                    │  Orchestrator │  ← Nhận yêu cầu từ user
>                    │  (Agent Sếp)  │  ← Lên kế hoạch, phân công
>                    └──────┬───────┘
>                           │
>            ┌──────────────┼──────────────┐
>            ▼              ▼              ▼
>     ┌────────────┐ ┌────────────┐ ┌────────────┐
>     │  Worker A   │ │  Worker B   │ │  Worker C   │
>     │ (Research)  │ │  (Code)     │ │  (Review)   │
>     └────────────┘ └────────────┘ └────────────┘
>            │              │              │
>            └──────────────┼──────────────┘
>                           ▼
>                    ┌──────────────┐
>                    │  Orchestrator │  ← Tổng hợp kết quả
>                    │  trả về user  │
>                    └──────────────┘
> ```
>
> **3. Vai trò của Orchestrator (Agent Sếp)**
>
> -   **Planning**: Phân tích yêu cầu → tách thành subtasks
> -   **Delegation**: Chọn worker phù hợp cho từng subtask (dựa trên Agent Card / capability)
> -   **Monitoring**: Theo dõi tiến độ, xử lý lỗi, retry nếu worker fail
> -   **Aggregation**: Tổng hợp output từ nhiều worker thành kết quả cuối
> -   **Quality Control**: Kiểm tra chất lượng output trước khi trả về user
>
> **4. Ví dụ thực tế: Claude Code (Anthropic)**
>
> Claude Code dùng mô hình Hierarchical — main agent (Orchestrator) nhận lệnh từ user, spawn subagent (Worker) cho từng
> tác vụ:
>
> ```
> User: "Implement authentication feature"
>       ↓
> [Main Agent - Orchestrator]
>   ├── spawn Planner Agent    → Lên kế hoạch implementation
>   ├── spawn Coder Agent      → Viết code theo plan
>   ├── spawn Tester Agent     → Chạy test, báo lỗi
>   └── spawn Reviewer Agent   → Review code quality
>       ↓
> [Main Agent tổng hợp] → Trả kết quả cho user
> ```
>
> **5. Ưu và nhược điểm**
>
> | Ưu điểm                                        | Nhược điểm                                            |
> | ---------------------------------------------- | ----------------------------------------------------- |
> | Dễ kiểm soát luồng — một điểm quản lý duy nhất | Single point of failure — sếp chết = cả hệ thống dừng |
> | Chuyên môn hóa — mỗi worker giỏi một lĩnh vực  | Bottleneck — mọi thứ phải qua sếp                     |
> | Dễ debug — biết chính xác ai làm gì            | Chi phí token cao — sếp phải đọc hiểu tất cả output   |
> | Phù hợp tác vụ có cấu trúc rõ ràng             | Không linh hoạt khi worker cần giao tiếp trực tiếp    |
>
> **6. Khi nào dùng Hierarchical?**
>
> -   Tác vụ có thể **chia rõ ràng** thành subtask độc lập
> -   Cần **kiểm soát chặt** luồng công việc và chất lượng output
> -   Worker **không cần giao tiếp** trực tiếp với nhau
> -   Ví dụ: code generation pipeline, content creation workflow, data processing pipeline
>
> _Dòng kiến thức vàng:_ Hierarchical Model là mô hình MAS phổ biến nhất vì đơn giản và dễ kiểm soát — giống cấu trúc
> công ty truyền thống. Orchestrator là "brain" của hệ thống, chất lượng output phụ thuộc lớn vào khả năng planning và
> delegation của Orchestrator. Đây là mô hình mà Claude Code, ChatGPT với tool use, và hầu hết AI coding assistant đang
> dùng.

-   **Sequential Model:** Mô hình tuần tự (Sequential) hoạt động theo dây chuyền ra sao?

> **Trả lời:**
>
> **1. Khái niệm Sequential Model**
>
> Sequential Model (Pipeline/Chain) là mô hình Multi-Agent trong đó các agent xử lý tác vụ **theo thứ tự nối tiếp** —
> output của agent trước là input của agent sau, giống dây chuyền sản xuất.
>
> **Ẩn dụ:** Dây chuyền lắp ráp ô tô — trạm 1 hàn khung, trạm 2 lắp động cơ, trạm 3 sơn, trạm 4 kiểm tra chất lượng. Mỗi
> trạm chuyên một việc, sản phẩm đi qua tuần tự.
>
> **2. Kiến trúc**
>
> ```
> [Input] → [Agent A] → [Agent B] → [Agent C] → [Agent D] → [Output]
>            Research     Draft       Review      Polish
>
> Ví dụ: Content Creation Pipeline
> [Topic] → [Researcher] → [Writer] → [Editor] → [SEO Optimizer] → [Article]
>            Thu thập       Viết bài   Chỉnh sửa   Tối ưu SEO
>            tài liệu      nháp       ngữ pháp     keyword
> ```
>
> **3. So sánh với Hierarchical**
>
> | Tiêu chí      | Hierarchical                           | Sequential                             |
> | ------------- | -------------------------------------- | -------------------------------------- |
> | Cấu trúc      | Sếp + nhiều nhân viên (star)           | Dây chuyền nối tiếp (chain)            |
> | Luồng dữ liệu | Hub-and-spoke (qua sếp)                | Linear (agent → agent)                 |
> | Orchestrator  | Có, quản lý tập trung                  | Không cần, mỗi agent tự biết bước tiếp |
> | Song song hóa | Worker có thể chạy đồng thời           | Không — phải tuần tự                   |
> | Phù hợp       | Tác vụ chia được thành subtask độc lập | Tác vụ có thứ tự phụ thuộc rõ ràng     |
>
> **4. Ví dụ thực tế: AI Code Review Pipeline**
>
> ```
> [Pull Request]
>       ↓
> [Agent 1: Code Parser]     → Phân tích diff, extract changed functions
>       ↓
> [Agent 2: Security Scanner] → Quét vulnerability (SQL injection, XSS...)
>       ↓
> [Agent 3: Logic Reviewer]   → Đánh giá logic, edge cases, bugs
>       ↓
> [Agent 4: Style Checker]    → Kiểm tra coding conventions, naming
>       ↓
> [Agent 5: Report Generator] → Tổng hợp tất cả findings → review report
>       ↓
> [Output: Structured Review]
> ```
>
> **5. Biến thể: Sequential with Feedback Loop**
>
> Sequential thuần túy chỉ đi một chiều. Biến thể nâng cao cho phép **quay lại bước trước** khi phát hiện vấn đề:
>
> ```
> [Writer] → [Reviewer] → Nếu chất lượng thấp → quay lại [Writer]
>                        → Nếu đạt → tiếp tục [Publisher]
> ```
>
> Đây chính là ứng dụng của **Reflection & Self-Correction** (đã học ở Module 4) trong context Multi-Agent.
>
> **6. Ưu và nhược điểm**
>
> | Ưu điểm                                             | Nhược điểm                                           |
> | --------------------------------------------------- | ---------------------------------------------------- |
> | Đơn giản, dễ hiểu, dễ implement                     | Chậm — phải đợi từng bước                            |
> | Mỗi agent chuyên sâu một bước                       | Một agent lỗi → cả pipeline dừng                     |
> | Dễ debug — biết lỗi ở bước nào                      | Không song song hóa được                             |
> | Output có chất lượng cao (qua nhiều lớp refinement) | Tốn token — mỗi agent phải đọc full context trước đó |
>
> **7. Khi nào dùng Sequential?**
>
> -   Tác vụ có **thứ tự phụ thuộc** rõ ràng (bước sau cần output bước trước)
> -   Cần **refinement qua nhiều lớp** (draft → review → polish)
> -   Pipeline ETL: Extract → Transform → Load
> -   Content pipeline: Research → Write → Edit → Publish
>
> _Dòng kiến thức vàng:_ Sequential Model là "dây chuyền sản xuất" của AI — đơn giản, dễ kiểm soát, nhưng chậm vì không
> song song được. Điểm mạnh lớn nhất: output được refine qua nhiều bước nên chất lượng cao. Điểm yếu: một mắt xích hỏng
> = cả chain dừng. Phù hợp nhất cho tác vụ có workflow tuyến tính rõ ràng.

-   **Hybrid Model:** Mô hình hỗn hợp trong đa tác nhân là gì?

> **Trả lời:**
>
> **1. Khái niệm Hybrid Model**
>
> Hybrid Model kết hợp **nhiều mô hình phối hợp** (Hierarchical + Sequential + Parallel + Peer-to-Peer) trong cùng một
> hệ thống Multi-Agent. Thay vì chọn một mô hình duy nhất, Hybrid cho phép mỗi phần của workflow dùng mô hình phù hợp
> nhất.
>
> **Ẩn dụ:** Một công ty vừa có cấu trúc phân cấp (CEO → Manager → Staff), vừa có dây chuyền sản xuất (R&D →
> Manufacturing → QA), vừa có team agile tự quản (peer-to-peer). Các cấu trúc này tồn tại đồng thời trong cùng tổ chức.
>
> **2. Kiến trúc Hybrid điển hình**
>
> ```
>                    ┌──────────────┐
>                    │  Orchestrator │  ← Hierarchical: Sếp điều phối
>                    └──────┬───────┘
>                           │
>            ┌──────────────┼──────────────┐
>            ▼              ▼              ▼
>     ┌────────────┐ ┌────────────┐ ┌────────────┐
>     │  Research   │ │  Dev Team   │ │  QA Team    │
>     │  Agent      │ │ (Sub-group) │ │ (Sub-group) │
>     └────────────┘ └─────┬──────┘ └─────┬──────┘
>                          │              │
>                    ┌─────┼─────┐  Sequential:
>                    ▼     ▼     ▼  QA sau Dev
>                  [FE]  [BE]  [DB]
>                  Parallel: chạy đồng thời
> ```
>
> Trong ví dụ trên:
>
> -   **Hierarchical**: Orchestrator phân công cho Research, Dev Team, QA Team
> -   **Parallel**: Trong Dev Team, FE/BE/DB agent chạy đồng thời
> -   **Sequential**: QA chạy sau khi Dev hoàn thành
>
> **3. So sánh 3 mô hình cơ bản + Hybrid**
>
> | Tiêu chí    | Hierarchical    | Sequential | Parallel        | Hybrid         |
> | ----------- | --------------- | ---------- | --------------- | -------------- |
> | Cấu trúc    | Sếp → nhân viên | Dây chuyền | Đồng thời       | Kết hợp tất cả |
> | Tốc độ      | Trung bình      | Chậm nhất  | Nhanh nhất      | Tối ưu         |
> | Độ phức tạp | Thấp            | Thấp       | Trung bình      | Cao            |
> | Linh hoạt   | Trung bình      | Thấp       | Trung bình      | Cao nhất       |
> | Use case    | Task rõ ràng    | Pipeline   | Subtask độc lập | Hệ thống lớn   |
>
> **4. Ví dụ thực tế: Software Development MAS**
>
> ```
> [User Request: "Build a todo app with auth"]
>       ↓
> [Orchestrator Agent]  ← Hierarchical
>   │
>   ├── [Planner Agent] → Tạo implementation plan
>   │         ↓           ← Sequential: Plan trước, code sau
>   ├── [Dev Team]  ← Parallel: 3 agent chạy cùng lúc
>   │     ├── [Frontend Agent]  → React components
>   │     ├── [Backend Agent]   → API endpoints
>   │     └── [Database Agent]  → Schema + migrations
>   │         ↓
>   ├── [Integration Agent] → Kết nối FE-BE-DB  ← Sequential
>   │         ↓
>   ├── [Tester Agent] → Chạy test suite  ← Sequential
>   │         ↓
>   └── [Orchestrator] → Tổng hợp, review, trả về user
> ```
>
> **5. Khi nào dùng Hybrid?**
>
> -   Hệ thống phức tạp với **nhiều loại tác vụ** khác nhau (research, code, test, deploy)
> -   Cần **tối ưu cả tốc độ** (parallel) lẫn **chất lượng** (sequential review)
> -   Có **subtask độc lập** (parallel được) và **subtask phụ thuộc** (phải sequential)
> -   Framework hỗ trợ: **CrewAI**, **AutoGen**, **LangGraph**, **Claude Code** (Task tool với nhiều subagent types)
>
> **6. Trade-off của Hybrid**
>
> -   **Ưu**: Linh hoạt nhất, tối ưu cho từng phần workflow, gần giống cách tổ chức thực tế hoạt động
> -   **Nhược**: Phức tạp nhất — cần thiết kế cẩn thận, khó debug, chi phí orchestration cao, cần xử lý race condition
>     khi parallel agents truy cập cùng resource
>
> _Dòng kiến thức vàng:_ Hybrid Model là "thế giới thực" của Multi-Agent — không hệ thống phức tạp nào chỉ dùng một mô
> hình. Hierarchical cho quản lý, Sequential cho pipeline, Parallel cho tốc độ — kết hợp cả ba tạo ra hệ thống vừa nhanh
> vừa chất lượng. Phần lớn framework MAS hiện đại (CrewAI, AutoGen, LangGraph) đều hỗ trợ Hybrid mặc định.

### 2. Cơ chế vận hành

-   **Orchestration:** Cơ chế điều phối (Orchestration) quản lý luồng công việc giữa các Agent như thế nào?

> **Trả lời:**
>
> **1. Orchestration là gì?**
>
> Orchestration là cơ chế **quản lý trung tâm** điều phối luồng công việc giữa các agent — quyết định agent nào chạy,
> khi nào, với input gì, và xử lý output ra sao. Orchestrator là "nhạc trưởng" của dàn nhạc Multi-Agent.
>
> **Ẩn dụ:** Nhạc trưởng dàn giao hưởng — không tự chơi nhạc cụ nào, nhưng quyết định khi nào violin vào, khi nào trống
> nổi, tempo nhanh hay chậm, và tất cả hòa quyện thành bản nhạc hoàn chỉnh.
>
> **2. Orchestration vs Choreography**
>
> Có 2 cách phối hợp Multi-Agent:
>
> | Tiêu chí           | Orchestration                       | Choreography                      |
> | ------------------ | ----------------------------------- | --------------------------------- |
> | Điều khiển         | Tập trung — 1 Orchestrator ra lệnh  | Phi tập trung — agent tự phối hợp |
> | Ẩn dụ              | Nhạc trưởng điều khiển dàn nhạc     | Nhóm nhạc jazz tự ngẫu hứng       |
> | Ai biết toàn cảnh? | Orchestrator biết hết               | Không ai biết toàn bộ             |
> | Dễ debug?          | Dễ — 1 điểm quan sát                | Khó — phải trace nhiều agent      |
> | Scalable?          | Hạn chế (bottleneck ở orchestrator) | Tốt hơn (không single point)      |
> | Ví dụ              | Claude Code Task tool               | Swarm agents tự giao tiếp         |
>
> **3. Luồng Orchestration điển hình**
>
> ```
> ┌─────────────────────────────────────────────────┐
> │                 ORCHESTRATOR                     │
> │                                                  │
> │  1. RECEIVE    ← Nhận request từ user            │
> │  2. PLAN       ← Phân tích, tách subtasks        │
> │  3. DELEGATE   ← Chọn agent, gửi task            │
> │  4. MONITOR    ← Theo dõi progress, handle error  │
> │  5. AGGREGATE  ← Tổng hợp results                │
> │  6. RESPOND    ← Trả output cho user             │
> └─────────────────────────────────────────────────┘
>
> Bước 3-4 lặp lại cho đến khi tất cả subtask hoàn thành.
> ```
>
> **4. Các chiến lược Orchestration**
>
> -   **Static Orchestration**: Workflow được định nghĩa trước (hardcode) — agent A luôn chạy trước B. Ví dụ: CI/CD
>     pipeline
> -   **Dynamic Orchestration**: Orchestrator dùng LLM để **tự quyết định** workflow dựa trên input. Ví dụ: Claude Code
>     phân tích request → quyết định cần spawn bao nhiêu subagent, loại gì
> -   **Adaptive Orchestration**: Điều chỉnh workflow **runtime** dựa trên kết quả trung gian — nếu agent A fail, thử
>     agent B thay thế
>
> **5. Ví dụ: Dynamic Orchestration trong Claude Code**
>
> ```
> User: "Fix the login bug and add dark mode"
>       ↓
> [Orchestrator LLM phân tích]
>   → 2 task độc lập, có thể parallel
>       ↓
> [Spawn 2 subagent đồng thời]
>   ├── debugger agent → "Fix login bug"
>   └── fullstack-developer agent → "Add dark mode"
>       ↓
> [Cả 2 hoàn thành]
>       ↓
> [Orchestrator tổng hợp] → Báo cáo cho user
> ```
>
> Nếu user chỉ nói "Fix login bug", Orchestrator chỉ spawn 1 agent. Logic delegation **thay đổi dựa trên input** — đó là
> Dynamic Orchestration.
>
> **6. Framework hỗ trợ Orchestration**
>
> -   **LangGraph** (LangChain): Định nghĩa workflow dạng graph, nodes = agent, edges = routing logic
> -   **CrewAI**: Định nghĩa Crew (nhóm agent) với process = sequential/hierarchical
> -   **AutoGen** (Microsoft): Agent conversation framework, Orchestrator là GroupChatManager
> -   **OpenAI Agents SDK**: Built-in handoff + orchestration pattern
> -   **Claude Code**: Task tool với subagent_type routing
>
> _Dòng kiến thức vàng:_ Orchestration là "hệ thần kinh trung ương" của Multi-Agent System — quyết định ai làm gì, khi
> nào, và tổng hợp kết quả. Static Orchestration đơn giản nhưng cứng nhắc; Dynamic Orchestration (dùng LLM làm
> orchestrator) linh hoạt nhưng tốn token và khó dự đoán. Xu hướng hiện tại: LLM-powered dynamic orchestration với
> fallback về static khi cần deterministic.

-   **Hand-off:** Quy trình bàn giao (Hand-off) ngữ cảnh từ Agent này sang Agent khác diễn ra ra sao?

> **Trả lời:**
>
> **1. Hand-off là gì?**
>
> Hand-off là quy trình **bàn giao ngữ cảnh, trạng thái và quyền kiểm soát** từ Agent A sang Agent B trong hệ thống
> Multi-Agent. Khi Agent A xác định tác vụ nằm ngoài khả năng của mình hoặc thuộc chuyên môn agent khác, nó sẽ hand-off
> cho agent phù hợp hơn.
>
> **Ẩn dụ:** Khách gọi tổng đài → Nhân viên tiếp nhận nghe nhu cầu → chuyển cho bộ phận kỹ thuật, kèm theo tóm tắt:
> "Khách tên A, vấn đề X, đã thử Y nhưng chưa giải quyết được."
>
> **2. Thành phần của một Hand-off**
>
> ```
> ┌─────────────────────────────────────┐
> │           HAND-OFF PAYLOAD          │
> │                                     │
> │  1. Context    : Tóm tắt cuộc hội  │
> │                  thoại đến hiện tại │
> │  2. Intent     : Mục đích/yêu cầu  │
> │                  của user           │
> │  3. State      : Trạng thái hiện   │
> │                  tại (data đã thu   │
> │                  thập, bước đã làm) │
> │  4. Metadata   : User ID, session  │
> │                  ID, priority       │
> │  5. Target     : Agent đích sẽ     │
> │                  nhận hand-off      │
> └─────────────────────────────────────┘
> ```
>
> **3. Các kiểu Hand-off**
>
> | Kiểu              | Mô tả                                                                    | Ví dụ                                                                |
> | ----------------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------- |
> | **Explicit**      | Agent chủ động quyết định hand-off dựa trên rule hoặc reasoning          | "Câu hỏi này về billing → chuyển cho Billing Agent"                  |
> | **Implicit**      | Orchestrator tự động route dựa trên intent classification                | User nói "refund" → Orchestrator route đến Refund Agent              |
> | **Escalation**    | Agent không xử lý được → leo thang lên agent có quyền cao hơn hoặc human | Agent cấp 1 không giải được → chuyển agent cấp 2 → human             |
> | **Collaborative** | Agent A cần kết quả từ Agent B → gửi request, nhận response, tiếp tục    | Code Agent cần database schema → hỏi DB Agent → nhận → tiếp tục code |
>
> **4. Ví dụ: OpenAI Agents SDK Hand-off**
>
> OpenAI Agents SDK có built-in handoff primitive:
>
> ```
> # Pseudo-code minh họa
> triage_agent = Agent(
>     name="Triage",
>     instructions="Phân loại yêu cầu và chuyển cho agent phù hợp",
>     handoffs=[billing_agent, technical_agent, sales_agent]
> )
>
> # Khi user hỏi về hóa đơn:
> # Triage Agent reasoning: "Câu hỏi về billing"
> # → Tự động hand-off sang billing_agent
> # → Kèm context: conversation history + user intent
> ```
>
> **5. Thách thức của Hand-off**
>
> -   **Context Loss**: Chuyển giao không đủ context → agent mới hỏi lại thông tin user đã cung cấp (trải nghiệm tệ)
> -   **Infinite Loop**: Agent A chuyển cho B, B chuyển lại A vì không ai nhận trách nhiệm
> -   **Latency**: Mỗi lần hand-off cần thời gian xử lý context, re-prompt agent mới
> -   **Context Window Overflow**: Nếu chuyển toàn bộ conversation history, dễ vượt context window của agent mới
>
> **6. Best Practices**
>
> -   **Summarize, don't dump**: Tóm tắt context thay vì gửi nguyên conversation history
> -   **Structured handoff payload**: Dùng format chuẩn (JSON) thay vì free-text
> -   **Handoff confirmation**: Agent đích xác nhận đã nhận đủ context trước khi tiếp tục
> -   **Max handoff depth**: Giới hạn số lần hand-off (ví dụ: tối đa 3 lần) để tránh infinite loop
> -   **Fallback to human**: Nếu không agent nào xử lý được → escalate cho human (HITL — đã học Module 4)
>
> _Dòng kiến thức vàng:_ Hand-off là "nghệ thuật bàn giao" trong Multi-Agent — quyết định trải nghiệm user mượt mà hay
> gián đoạn. Chìa khóa: truyền đủ context (nhưng đừng quá nhiều), dùng structured payload, và luôn có fallback. Hand-off
> tốt = user không nhận ra mình đang nói chuyện với agent khác.

-   **Capability Discovery:** Khả năng tự phát hiện (Capability Discovery) của các Agent trong mạng lưới là gì?

> **Trả lời:**
>
> **1. Capability Discovery là gì?**
>
> Capability Discovery là khả năng một Agent **tự phát hiện và hiểu năng lực** của các Agent khác trong mạng lưới — biết
> ai làm được gì, giỏi lĩnh vực nào, có tool gì — mà **không cần hardcode** danh sách trước.
>
> **Ẩn dụ:** Bạn mới vào công ty, không biết ai phụ trách gì. Thay vì hỏi từng người, bạn mở **sổ danh bạ nội bộ** —
> thấy ngay: "Anh A - DevOps, chị B - Design, anh C - Backend". Đó là Capability Discovery.
>
> **2. Tại sao cần Capability Discovery?**
>
> Trong hệ thống MAS tĩnh, Orchestrator biết trước danh sách agent cố định. Nhưng khi hệ thống **mở rộng động** (thêm
> agent mới, loại bỏ agent cũ), cần cơ chế để:
>
> -   Agent mới tự **đăng ký** khả năng của mình
> -   Agent khác tự **tìm kiếm** agent phù hợp cho task
> -   Hệ thống tự **cập nhật** khi agent online/offline
>
> **3. Cơ chế hoạt động**
>
> ```
> ┌─────────────────────────────────────────┐
> │          AGENT REGISTRY                 │
> │       (Sổ danh bạ trung tâm)           │
> │                                         │
> │  Agent A: [code, python, debug]         │
> │  Agent B: [design, figma, css]          │
> │  Agent C: [test, selenium, jest]        │
> │  Agent D: [deploy, docker, k8s]         │
> └────────────────┬────────────────────────┘
>                  │
>        ┌─────────┼─────────┐
>        ▼         ▼         ▼
>    Register   Query     Deregister
>    (đăng ký)  (tìm)    (hủy đăng ký)
> ```
>
> **Luồng hoạt động:**
>
> 1. Agent mới khởi tạo → **Register**: "Tôi là Code Agent, giỏi Python, JavaScript, debugging"
> 2. Orchestrator cần tìm agent → **Query**: "Ai xử lý được Docker deployment?"
> 3. Registry trả về: "Agent D — capabilities: deploy, docker, k8s"
> 4. Agent offline → **Deregister**: Xóa khỏi registry
>
> **4. Cách triển khai trong thực tế**
>
> | Approach               | Mô tả                                                         | Ví dụ                                                                |
> | ---------------------- | ------------------------------------------------------------- | -------------------------------------------------------------------- |
> | **Agent Card** (A2A)   | Mỗi agent publish JSON mô tả capabilities, endpoint           | Google A2A Protocol — Agent Card chứa name, description, skills, URL |
> | **MCP Tool Discovery** | Server expose danh sách tools qua `tools/list`                | MCP protocol — Client tự discovery tools available trên Server       |
> | **Skill Registry**     | Central registry lưu mapping agent ↔ skills                   | Claude Code — subagent_type mô tả capability của từng agent          |
> | **Semantic Matching**  | Dùng embedding so sánh task description với agent description | Tìm agent phù hợp nhất bằng cosine similarity                        |
>
> **5. Ví dụ: MCP Tool Discovery (Module 5)**
>
> MCP chính là một dạng Capability Discovery ở cấp tool:
>
> ```
> MCP Client gửi: tools/list
> MCP Server trả về:
> [
>   { name: "read_file", description: "Read file content" },
>   { name: "search_code", description: "Search codebase" },
>   { name: "run_test", description: "Execute test suite" }
> ]
>
> → Client tự biết Server có thể làm gì
> → Không cần hardcode danh sách tool
> ```
>
> **6. Capability Discovery động vs tĩnh**
>
> | Tĩnh (Static)                        | Động (Dynamic)                              |
> | ------------------------------------ | ------------------------------------------- |
> | Danh sách agent cố định trong config | Agent tự register/deregister runtime        |
> | Đơn giản, dự đoán được               | Linh hoạt, auto-scaling                     |
> | Không handle agent mới               | Tự adapt khi thêm/bớt agent                 |
> | Phù hợp hệ thống nhỏ, ổn định        | Phù hợp hệ thống lớn, thay đổi thường xuyên |
>
> _Dòng kiến thức vàng:_ Capability Discovery là "trang vàng" của hệ thống Multi-Agent — cho phép agent tự tìm đúng
> "chuyên gia" cho công việc mà không cần ai chỉ định trước. MCP đã giải bài toán này ở cấp Tool (tools/list), A2A giải
> ở cấp Agent (Agent Card). Khi cả hai kết hợp, ta có hệ sinh thái AI tự tổ chức — agent mới tham gia tự quảng bá khả
> năng, agent cũ tự tìm partner phù hợp.

-   **Interoperability:** Khả năng tương tác liên thông (Interoperability) giữa các hệ sinh thái Agent khác nhau là gì?

> **Trả lời:**
>
> **1. Interoperability là gì?**
>
> Interoperability (Khả năng tương tác liên thông) là khả năng các AI Agent từ **các vendor, framework, và hệ sinh thái
> khác nhau** có thể giao tiếp, phối hợp và trao đổi dữ liệu với nhau một cách liền mạch — bất kể ai tạo ra chúng.
>
> **Ẩn dụ:** Điện thoại Samsung gọi được cho iPhone, email Gmail gửi được cho Outlook, USB-C cắm được mọi thiết bị. Tất
> cả nhờ **tiêu chuẩn chung** (GSM, SMTP, USB). Interoperability trong AI Agent cũng cần tiêu chuẩn chung tương tự.
>
> **2. Vấn đề hiện tại: Hệ sinh thái rời rạc**
>
> ```
> HIỆN TẠI (Silos):
> ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
> │  OpenAI      │  │  Anthropic   │  │  Google      │
> │  Ecosystem   │  │  Ecosystem   │  │  Ecosystem   │
> │              │  │              │  │              │
> │  GPT Agents  │  │ Claude Agents│  │ Gemini Agents│
> │  + Tools     │  │  + MCP       │  │  + A2A       │
> │              │  │              │  │              │
> │  ╳ Không nói │  │  ╳ Không nói │  │  ╳ Không nói │
> │  được với    │  │  được với    │  │  được với    │
> │  Claude/Gem  │  │  GPT/Gemini  │  │  GPT/Claude  │
> └──────────────┘  └──────────────┘  └──────────────┘
>
> TƯƠNG LAI (Interoperable):
> ┌──────────────────────────────────────────────┐
> │           OPEN PROTOCOL LAYER                │
> │         (MCP + A2A + Open Standards)         │
> │                                              │
> │  GPT Agent ←→ Claude Agent ←→ Gemini Agent  │
> │      ↕            ↕              ↕           │
> │  Any Tool    Any Data Source   Any Service   │
> └──────────────────────────────────────────────┘
> ```
>
> **3. Các lớp Interoperability**
>
> | Lớp                | Mô tả                                 | Protocol/Standard                   |
> | ------------------ | ------------------------------------- | ----------------------------------- |
> | **Transport**      | Agent giao tiếp qua mạng như thế nào? | HTTP, WebSocket, gRPC               |
> | **Message Format** | Cấu trúc tin nhắn ra sao?             | JSON-RPC (MCP), JSON (A2A)          |
> | **Capability**     | Agent mô tả khả năng thế nào?         | Agent Card (A2A), Tools/List (MCP)  |
> | **Task**           | Giao và theo dõi task ra sao?         | Task object (A2A), Function Calling |
> | **Authentication** | Xác thực danh tính agent?             | OAuth 2.0, API Key, mTLS            |
> | **Semantic**       | Agent hiểu ngữ nghĩa của nhau?        | Shared ontology, Schema alignment   |
>
> **4. Hai trụ cột Protocol cho Interoperability**
>
> Như đã học ở Module 5 và câu A2A:
>
> -   **MCP (Anthropic)**: Giải bài toán Agent ↔ Tool interoperability — bất kỳ agent nào cũng dùng được bất kỳ MCP
>     server nào
> -   **A2A (Google)**: Giải bài toán Agent ↔ Agent interoperability — bất kỳ agent nào cũng giao tiếp được với bất kỳ
>     agent nào
>
> ```
> MCP + A2A = Nền tảng Interoperability hoàn chỉnh
>
> Agent (bất kỳ vendor) ──MCP──→ Tool (bất kỳ vendor)
>         │
>         │──A2A──→ Agent khác (bất kỳ vendor)
> ```
>
> **5. Thách thức Interoperability**
>
> -   **Protocol Fragmentation**: Quá nhiều protocol cạnh tranh, chưa có tiêu chuẩn thống nhất toàn cầu
> -   **Semantic Gap**: Agent A hiểu "priority: high" khác Agent B hiểu "priority: 1" — cần schema mapping
> -   **Trust & Security**: Cho phép agent lạ truy cập data/tool → rủi ro bảo mật. Cần authentication, authorization,
>     sandboxing
> -   **Version Compatibility**: Protocol thay đổi → agent cũ không tương thích agent mới
> -   **Performance Overhead**: Thêm lớp protocol → tăng latency, tốn bandwidth
>
> **6. Xu hướng tương lai**
>
> -   **Convergence**: MCP và A2A đang tiến tới **bổ sung nhau** (complementary) thay vì cạnh tranh. Google đã support
>     MCP trong Gemini, Anthropic acknowledge A2A
> -   **Agent Marketplace**: Tương tự App Store — browse, install, compose agent từ nhiều vendor
> -   **Federated Agent Network**: Các tổ chức chạy agent riêng nhưng liên thông qua protocol chung — giống federated
>     email (Gmail ↔ Outlook)
> -   **W3C / ISO Standardization**: Có thể sẽ có tiêu chuẩn chính thức cho AI Agent interoperability
>
> _Dòng kiến thức vàng:_ Interoperability là "giấc mơ Internet" của AI Agent — mọi agent nói chuyện được với mọi agent,
> dùng được mọi tool, bất kể vendor. MCP giải phần Agent↔Tool, A2A giải phần Agent↔Agent. Khi cả hai trở thành standard,
> ta sẽ có "Internet of Agents" — hệ sinh thái AI mở, liên thông, và cộng tác. Hiện tại vẫn ở giai đoạn sớm, nhưng hướng
> đi đã rõ ràng.

