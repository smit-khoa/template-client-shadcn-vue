# AI Training Curriculum

> **Lưu ý:** Các dòng chữ tô đỏ thì đội tech bắt buộc phải học, còn với các nhân sự khác có thể học hoặc bỏ qua.

---

## MODULE 3: XÂY DỰNG TRỢ LÝ, TỐI ƯU HÓA & DỮ LIỆU (RAG & FINE-TUNING)

### 1. Định hình Trợ lý (Assistant Design)

-   **Assistant Persona:** Các yếu tố cấu thành nên danh tính và giọng văn (Tone of voice) của một trợ lý AI là gì?

> **Trả lời:**
>
> **1. Assistant Persona là gì?**
>
> Assistant Persona (Nhân cách trợ lý) là tập hợp các đặc điểm về tính cách, phong cách giao tiếp, giọng văn và hành vi
> mà bạn thiết kế cho một trợ lý AI, biến nó từ một "công cụ trả lời chung chung" thành một "nhân vật" có bản sắc riêng,
> nhất quán và phù hợp với thương hiệu hoặc mục đích sử dụng.
>
> **2. Các yếu tố cấu thành Persona**
>
> -   **Vai trò (Role):** AI "là ai"? Một chuyên gia tư vấn? Một trợ lý hành chính? Một giáo viên? Vai trò quyết định
>     phạm vi kiến thức và mức độ chuyên sâu của câu trả lời. Đây chính là ứng dụng của kỹ thuật Role Prompting đã học ở
>     Module 2.
>     -   _Ví dụ:_ "Bạn là chuyên gia dinh dưỡng thể thao với 10 năm kinh nghiệm."
> -   **Giọng văn (Tone of Voice):** Cách AI "nói chuyện" — trang trọng hay thân mật? Hài hước hay nghiêm túc? Ngắn gọn
>     hay chi tiết? Giọng văn phải phù hợp với đối tượng người dùng và bối cảnh sử dụng.
>     -   _Ví dụ:_ Chatbot ngân hàng → trang trọng, chính xác. Chatbot quán cà phê → thân thiện, dí dỏm.
> -   **Phong cách trả lời (Response Style):** Định dạng đầu ra mặc định — dùng gạch đầu dòng hay đoạn văn? Có emoji
>     không? Độ dài trung bình bao nhiêu? Có dùng thuật ngữ chuyên ngành không?
> -   **Ranh giới hành vi (Behavioral Boundaries):** Những gì AI "không được làm" — không đưa ra lời khuyên y tế, không
>     bàn chính trị, không tiết lộ thông tin nội bộ. Đây là lớp bảo vệ quan trọng nhất, thường được đặt trong System
>     Prompt.
> -   **Kiến thức nền (Background Knowledge):** Thông tin cơ bản về công ty, sản phẩm, chính sách mà AI cần "biết" để
>     trả lời chính xác. Phần này liên quan trực tiếp đến Knowledge Base (sẽ thảo luận ở câu tiếp theo).
>
> **3. Cách triển khai Persona trong System Prompt**
>
> Tất cả các yếu tố trên được "đóng gói" vào System Prompt — lớp chỉ dẫn đầu tiên mà AI nhận được trước mọi cuộc hội
> thoại:
>
> ```
> [System Prompt]
> Bạn là "Miu" — trợ lý ảo của chuỗi cà phê XYZ.
> - Giọng văn: Thân thiện, trẻ trung, dùng emoji vừa phải.
> - Phong cách: Trả lời ngắn gọn (tối đa 3 câu), dùng ngôn ngữ đời thường.
> - Ranh giới: Chỉ trả lời về menu, khuyến mãi, và địa chỉ quán. Từ chối lịch sự nếu hỏi ngoài phạm vi.
> - Kiến thức: [Chèn menu, giá, địa chỉ, giờ mở cửa]
> ```
>
> **4. Tại sao Persona quan trọng?**
>
> -   **Nhất quán thương hiệu:** Dù hàng nghìn khách hàng hỏi cùng lúc, AI luôn "nói chuyện" với cùng một phong cách,
>     không bị ảnh hưởng bởi tâm trạng hay mệt mỏi như nhân viên thật.
> -   **Tăng trải nghiệm người dùng:** Người dùng cảm thấy đang nói chuyện với một "nhân vật" có cá tính, không phải một
>     cỗ máy lạnh lùng.
> -   **Kiểm soát rủi ro:** Ranh giới hành vi ngăn AI đưa ra thông tin sai, nhạy cảm, hoặc gây tổn hại cho thương hiệu.
>
> _Dòng kiến thức vàng:_ Persona là "linh hồn" của trợ lý AI — nó quyết định AI không chỉ "nói đúng" mà còn "nói đúng
> kiểu". Một Persona tốt được xây dựng từ 5 yếu tố: Vai trò, Giọng văn, Phong cách, Ranh giới và Kiến thức nền, tất cả
> được mã hóa trong System Prompt.

-   **Knowledge Base:** Cơ sở tri thức (Knowledge Base) cho AI bao gồm những định dạng dữ liệu nào?

> **Trả lời:**
>
> **1. Knowledge Base (Cơ sở tri thức) là gì?**
>
> Knowledge Base là tập hợp tất cả các tài liệu, dữ liệu và thông tin được cung cấp cho trợ lý AI để nó có thể trả lời
> chính xác các câu hỏi trong phạm vi cụ thể. Nếu Persona là "linh hồn" của AI, thì Knowledge Base là "bộ não chuyên
> môn" — nơi chứa kiến thức mà AI dựa vào thay vì phải "đoán" từ kiến thức nén chung.
>
> **2. Các định dạng dữ liệu phổ biến**
>
> -   **Tài liệu văn bản (Text Documents):** PDF, Word, TXT, Markdown — bao gồm chính sách công ty, hướng dẫn sử dụng,
>     tài liệu kỹ thuật, FAQ. Đây là định dạng phổ biến nhất và dễ xử lý nhất.
> -   **Bảng tính (Spreadsheets):** Excel, CSV — chứa dữ liệu có cấu trúc như bảng giá, danh sách sản phẩm, thống kê. AI
>     cần xử lý thêm bước chuyển đổi (parsing) để hiểu quan hệ hàng-cột.
> -   **Trang web (Web Pages):** HTML, sitemap — nội dung website, blog, trang hỗ trợ. Thường được crawl và chuyển đổi
>     thành văn bản thuần trước khi đưa vào hệ thống.
> -   **Cơ sở dữ liệu (Databases):** SQL, NoSQL — dữ liệu có cấu trúc cao, phù hợp cho các truy vấn chính xác (tra cứu
>     đơn hàng, kiểm tra tồn kho).
> -   **Dữ liệu đa phương tiện (Multimedia):** Hình ảnh (kèm mô tả Alt Text), âm thanh (đã chuyển thành transcript),
>     video (đã trích xuất phụ đề). AI cần các bước tiền xử lý để chuyển dữ liệu đa phương tiện thành dạng văn bản.
> -   **Dữ liệu hội thoại (Conversation Logs):** Lịch sử chat, email, phiếu hỗ trợ — giúp AI học từ các tình huống thực
>     tế đã xảy ra.
> -   **API & Dữ liệu thời gian thực (Real-time Data):** Kết nối với hệ thống CRM, ERP, hoặc API để lấy dữ liệu mới nhất
>     (giá cổ phiếu, tình trạng đơn hàng). Phần này liên quan đến Function Calling sẽ học ở Module 4.
>
> **3. Nguyên tắc xây dựng Knowledge Base hiệu quả**
>
> -   **Chất lượng hơn số lượng:** 100 trang tài liệu chính xác, cập nhật tốt hơn 10.000 trang lỗi thời, mâu thuẫn.
>     Nguyên lý "Garbage In, Garbage Out" (Rác vào — Rác ra) áp dụng triệt để ở đây.
> -   **Cấu trúc rõ ràng:** Tài liệu có tiêu đề, phân mục, đánh số giúp AI tìm kiếm và trích xuất chính xác hơn nhiều so
>     với tài liệu "viết một đoạn dài".
> -   **Cập nhật thường xuyên:** Knowledge Base lỗi thời sẽ khiến AI đưa ra thông tin sai — nguy hiểm hơn cả việc không
>     có Knowledge Base.
> -   **Loại bỏ mâu thuẫn:** Nếu tài liệu A nói "bảo hành 12 tháng" nhưng tài liệu B nói "bảo hành 6 tháng", AI sẽ bối
>     rối và có thể trả lời ngẫu nhiên một trong hai.
>
> **4. Cách Knowledge Base kết nối với AI**
>
> Có hai cách chính để đưa Knowledge Base vào AI:
>
> -   **Nhúng trực tiếp vào Prompt (In-context):** Chèn tài liệu vào System Prompt hoặc User Prompt. Ưu điểm: đơn giản.
>     Nhược điểm: bị giới hạn bởi Context Window.
> -   **RAG (Retrieval-Augmented Generation):** Lưu trữ tài liệu trong Vector Database, tìm kiếm đoạn liên quan nhất khi
>     có câu hỏi, rồi đưa vào Prompt. Ưu điểm: không giới hạn dung lượng. Đây là chủ đề chính của phần tiếp theo trong
>     Module này.
>
> _Dòng kiến thức vàng:_ Knowledge Base là "thư viện cá nhân" của trợ lý AI. Nó có thể chứa mọi định dạng từ văn bản,
> bảng tính đến API thời gian thực, nhưng điều quan trọng nhất không phải là "nhiều" mà là "đúng, sạch và cập nhật". Một
> Knowledge Base tốt biến AI từ "biết nhiều nhưng không chính xác" thành "biết đúng thứ cần biết".

### 2. RAG (Retrieval-Augmented Generation) và Fine-tuning

-   **RAG là gì? Fine-tuning là gì?**

> **Trả lời:**
>
> **1. RAG (Retrieval-Augmented Generation) — Tạo sinh có hỗ trợ tìm kiếm**
>
> RAG là kiến trúc kết hợp hai khả năng: Tìm kiếm thông tin từ nguồn dữ liệu bên ngoài (Retrieval) và Tạo sinh câu trả
> lời bằng LLM (Generation). Thay vì chỉ dựa vào kiến thức nén từ quá trình huấn luyện, AI sẽ "tra cứu" tài liệu thực tế
> trước khi trả lời.
>
> -   _Ẩn dụ:_ RAG giống như một sinh viên được mang tài liệu vào phòng thi (open-book exam). Kiến thức nền vẫn quan
>     trọng, nhưng có tài liệu tham khảo giúp trả lời chính xác hơn rất nhiều.
> -   _Ưu điểm:_ Không cần huấn luyện lại mô hình, dễ cập nhật kiến thức (chỉ cần thêm/sửa tài liệu), chi phí thấp.
> -   _Nhược điểm:_ Phụ thuộc vào chất lượng tìm kiếm và tài liệu. Nếu tìm sai đoạn, AI sẽ "ảo giác có cơ sở"
>     (hallucinate with confidence).
>
> **2. Fine-tuning (Tinh chỉnh mô hình)**
>
> Fine-tuning là quá trình huấn luyện thêm một mô hình AI đã được đào tạo sẵn (Pre-trained Model) trên một tập dữ liệu
> chuyên biệt, để nó "thấm nhuần" kiến thức, phong cách hoặc hành vi mới vào chính các tham số (weights) của mạng
> nơ-ron.
>
> -   _Ẩn dụ:_ Fine-tuning giống như một bác sĩ đa khoa đi học chuyên khoa. Kiến thức y khoa nền đã có, nhưng cần huấn
>     luyện thêm để trở thành chuyên gia tim mạch.
> -   _Ưu điểm:_ Mô hình thực sự "hiểu" lĩnh vực chuyên môn, phản hồi nhanh (không cần bước tìm kiếm), có thể thay đổi
>     phong cách và hành vi sâu.
> -   _Nhược điểm:_ Tốn tài nguyên tính toán (GPU), cần dữ liệu huấn luyện chất lượng cao, khó cập nhật (phải train lại
>     khi có thông tin mới).
>
> **3. So sánh RAG vs Fine-tuning**
>
> | Đặc điểm                    | RAG                             | Fine-tuning                   |
> | --------------------------- | ------------------------------- | ----------------------------- |
> | Cách hoạt động              | Tìm kiếm + Tạo sinh             | Huấn luyện thêm mô hình       |
> | Cập nhật kiến thức          | Dễ (thêm/sửa tài liệu)          | Khó (phải train lại)          |
> | Chi phí                     | Thấp                            | Cao (cần GPU)                 |
> | Thay đổi hành vi/phong cách | Hạn chế                         | Mạnh                          |
> | Ảo giác                     | Giảm nếu tìm đúng               | Giảm nếu train tốt            |
> | Phù hợp với                 | Kiến thức thay đổi thường xuyên | Kiến thức ổn định, chuyên sâu |
>
> **4. Khi nào dùng gì?**
>
> -   **Dùng RAG khi:** Dữ liệu thay đổi thường xuyên (giá cả, chính sách, tin tức), cần truy xuất nguồn gốc (trích dẫn
>     tài liệu), ngân sách hạn chế.
> -   **Dùng Fine-tuning khi:** Cần AI nói giọng chuyên ngành (y tế, pháp lý), cần thay đổi phong cách trả lời sâu, dữ
>     liệu ổn định ít thay đổi.
> -   **Kết hợp cả hai:** Nhiều hệ thống thực tế dùng Fine-tuning để dạy AI "cách nói" (phong cách, thuật ngữ) rồi dùng
>     RAG để cung cấp "nói gì" (dữ liệu cập nhật).
>
> _Dòng kiến thức vàng:_ RAG là "cho AI mượn sách khi thi" — nhanh, rẻ, dễ cập nhật. Fine-tuning là "cho AI đi học thêm"
> — sâu, chuyên biệt, nhưng tốn kém. Trong thực tế, giải pháp tối ưu thường là kết hợp cả hai: Fine-tuning để dạy phong
> cách, RAG để cung cấp dữ liệu mới nhất.

-   **RAG Mechanism:** Cơ chế Retrieve (Tìm kiếm) - Augment (Tăng cường) - Generate (Tổng hợp) hoạt động như thế nào?

> **Trả lời:**
>
> **1. Tổng quan quy trình RAG**
>
> RAG hoạt động theo 3 giai đoạn tuần tự, mỗi giai đoạn đóng một vai trò riêng biệt trong việc biến câu hỏi của người
> dùng thành câu trả lời chính xác dựa trên dữ liệu thực:
>
> **2. Giai đoạn 1 — Retrieve (Tìm kiếm)**
>
> -   **Mục đích:** Tìm các đoạn tài liệu liên quan nhất đến câu hỏi của người dùng từ Knowledge Base.
> -   **Cách hoạt động:**
>     1. Câu hỏi của người dùng được chuyển thành Embedding (vector số học biểu diễn ý nghĩa ngữ nghĩa).
>     2. Hệ thống so sánh vector câu hỏi với các vector của từng đoạn tài liệu đã được lưu trong Vector Database.
>     3. Trả về Top-K đoạn tài liệu có độ tương đồng ngữ nghĩa cao nhất (thường 3-10 đoạn).
> -   _Ví dụ:_ Câu hỏi "Chính sách bảo hành máy tính?" → Hệ thống tìm được 5 đoạn tài liệu liên quan đến bảo hành, hoàn
>     trả, sửa chữa.
>
> **3. Giai đoạn 2 — Augment (Tăng cường)**
>
> -   **Mục đích:** Kết hợp câu hỏi gốc với các đoạn tài liệu tìm được thành một Prompt hoàn chỉnh cho LLM.
> -   **Cách hoạt động:**
>     1. Các đoạn tài liệu được chèn vào Prompt dưới dạng ngữ cảnh (context).
>     2. Thêm chỉ dẫn Grounding: yêu cầu AI chỉ trả lời dựa trên tài liệu được cung cấp.
>     3. Prompt cuối cùng có dạng: `[System Prompt] + [Tài liệu tìm được] + [Câu hỏi người dùng] + [Chỉ dẫn format]`
> -   _Ví dụ Prompt sau Augment:_
>
>     ```
>     Dựa trên tài liệu dưới đây, hãy trả lời câu hỏi. Nếu không tìm thấy, hãy nói "Không có thông tin."
>
>     <context>
>     [Đoạn 1: Chính sách bảo hành 12 tháng...]
>     [Đoạn 2: Điều kiện bảo hành...]
>     [Đoạn 3: Quy trình đổi trả...]
>     </context>
>
>     Câu hỏi: Chính sách bảo hành máy tính?
>     ```
>
> **4. Giai đoạn 3 — Generate (Tổng hợp)**
>
> -   **Mục đích:** LLM đọc Prompt đã được tăng cường và tạo ra câu trả lời tự nhiên, mạch lạc.
> -   **Cách hoạt động:**
>     1. LLM phân tích câu hỏi kết hợp với ngữ cảnh tài liệu.
>     2. Tổng hợp thông tin từ nhiều đoạn, loại bỏ phần không liên quan.
>     3. Sinh câu trả lời bằng ngôn ngữ tự nhiên, có thể kèm trích dẫn nguồn.
> -   _Điểm khác biệt:_ Ở bước này, AI không cần "nhớ" từ kiến thức nén mà "đọc" từ tài liệu thực — giống hệt Grounding
>     Prompting đã học ở Module 2, nhưng được tự động hóa hoàn toàn.
>
> **5. Sơ đồ tổng quát**
>
> ```
> Câu hỏi người dùng
>       ↓
> [RETRIEVE] → Embedding → Vector DB → Top-K đoạn tài liệu
>       ↓
> [AUGMENT] → Ghép câu hỏi + tài liệu + chỉ dẫn → Prompt hoàn chỉnh
>       ↓
> [GENERATE] → LLM → Câu trả lời dựa trên tài liệu thực
> ```
>
> _Dòng kiến thức vàng:_ RAG biến quy trình Grounding Prompting thủ công thành một hệ thống tự động: tự tìm tài liệu
> (Retrieve), tự ghép vào Prompt (Augment), và tự tạo câu trả lời (Generate). Chất lượng của RAG phụ thuộc nhiều nhất
> vào bước Retrieve — nếu tìm sai tài liệu, hai bước sau dù tốt đến mấy cũng cho kết quả sai.

-   **Embeddings & Vector Database:** Embeddings là gì? Vector Database lưu trữ và tìm kiếm sự tương đồng ngữ nghĩa ra
    sao?

> **Trả lời:**
>
> **1. Embeddings là gì?**
>
> Embedding là quá trình chuyển đổi một đoạn văn bản (từ, câu, đoạn) thành một dãy số (vector) trong không gian nhiều
> chiều, sao cho các đoạn văn bản có ý nghĩa tương tự sẽ có vector "gần nhau" trong không gian đó.
>
> -   _Ẩn dụ:_ Hãy tưởng tượng mỗi đoạn văn bản là một ngôi sao trên bầu trời. Embedding là quá trình gán "tọa độ" cho
>     mỗi ngôi sao. Hai ngôi sao có nội dung gần nghĩa sẽ nằm gần nhau trên bản đồ, dù câu chữ khác nhau hoàn toàn.
> -   _Ví dụ:_ "Con mèo ngồi trên ghế" và "Chú mèo đang ở trên chiếc ghế sofa" → hai câu khác từ ngữ nhưng embedding sẽ
>     gần nhau vì ý nghĩa tương đồng. Trong khi "Giá vàng hôm nay tăng mạnh" → embedding sẽ ở rất xa hai câu trên.
>
> **2. Embedding hoạt động như thế nào?**
>
> -   Một Embedding Model (mô hình nhúng) — ví dụ: OpenAI text-embedding-3, Cohere Embed, BAAI bge — sẽ nhận đầu vào là
>     một đoạn văn bản và trả về một vector gồm hàng trăm đến hàng nghìn con số (ví dụ: 1536 chiều với OpenAI).
> -   Mỗi chiều (dimension) đại diện cho một khía cạnh ngữ nghĩa trừu tượng mà con người không thể diễn giải trực tiếp,
>     nhưng máy tính có thể sử dụng để tính toán độ tương đồng.
>
> **3. Vector Database là gì?**
>
> Vector Database là cơ sở dữ liệu chuyên dụng được thiết kế để lưu trữ, đánh chỉ mục (index) và tìm kiếm nhanh các
> vector embedding. Khác với database truyền thống tìm kiếm bằng "khớp chính xác" (exact match), Vector Database tìm
> kiếm bằng "độ tương đồng" (similarity).
>
> Các Vector Database phổ biến:
>
> -   **Pinecone:** Fully managed, dễ dùng, phù hợp cho production.
> -   **Chroma:** Mã nguồn mở, nhẹ, phù hợp cho prototype và dự án nhỏ.
> -   **Weaviate:** Mã nguồn mở, hỗ trợ hybrid search (kết hợp semantic + keyword).
> -   **Qdrant:** Hiệu suất cao, hỗ trợ filtering nâng cao.
> -   **pgvector:** Extension cho PostgreSQL, phù hợp nếu đã dùng PostgreSQL.
>
> **4. Tìm kiếm tương đồng ngữ nghĩa (Semantic Similarity Search)**
>
> Quy trình tìm kiếm trong Vector Database:
>
> 1. **Đầu vào:** Câu hỏi người dùng → chuyển thành vector query.
> 2. **So sánh:** Vector query được so sánh với tất cả vector trong database bằng các thuật toán đo khoảng cách: Cosine
>    Similarity (phổ biến nhất), Euclidean Distance, hoặc Dot Product.
> 3. **Kết quả:** Trả về Top-K vector (tức Top-K đoạn tài liệu) có khoảng cách gần nhất với vector query.
>
> -   _Cosine Similarity:_ Đo góc giữa hai vector. Góc càng nhỏ (cosine càng gần 1) → hai đoạn văn bản càng giống nhau
>     về ý nghĩa.
>
> **5. Quy trình xây dựng (Ingestion Pipeline)**
>
> ```
> Tài liệu gốc → Cắt nhỏ (Chunking) → Embedding từng chunk → Lưu vào Vector Database
>                                                                     ↓
> Câu hỏi người dùng → Embedding câu hỏi → Tìm kiếm tương đồng → Top-K chunks → Đưa vào LLM
> ```
>
> _Dòng kiến thức vàng:_ Embedding là "phiên dịch viên" biến ngôn ngữ con người thành "tọa độ toán học" mà máy tính hiểu
> được. Vector Database là "bản đồ" nơi mỗi đoạn tài liệu có một vị trí, và khi có câu hỏi mới, hệ thống chỉ cần tìm các
> "vị trí lân cận" — tức các đoạn tài liệu có ý nghĩa gần nhất — để đưa vào RAG.

-   **Chunking Strategy:** Chiến lược cắt nhỏ dữ liệu (Semantic Chunking) ảnh hưởng thế nào đến độ chính xác khi tìm
    kiếm?

> **Trả lời:**
>
> **1. Chunking là gì và tại sao cần thiết?**
>
> Chunking (cắt nhỏ dữ liệu) là quá trình chia tài liệu dài thành các đoạn nhỏ (chunks) trước khi tạo embedding và lưu
> vào Vector Database. Lý do cần chunking:
>
> -   **Context Window có giới hạn:** Không thể nhét cả cuốn sách 500 trang vào Prompt. Cần chọn ra những đoạn liên quan
>     nhất.
> -   **Embedding có "vùng tập trung":** Một embedding cho cả tài liệu 50 trang sẽ là "bản tóm tắt trung bình" của mọi
>     thứ — quá chung chung để tìm kiếm chính xác. Embedding cho một đoạn 200 từ sẽ đại diện chính xác hơn cho nội dung
>     cụ thể của đoạn đó.
>
> **2. Các chiến lược Chunking**
>
> -   **Fixed-size Chunking (Cắt cố định):** Chia tài liệu thành các chunk có kích thước bằng nhau (ví dụ: mỗi 500 token
>     hoặc 1000 ký tự). Thường có "overlap" (phần chồng lấp) giữa các chunk liền kề (ví dụ: 50-100 token) để tránh cắt
>     ngang một ý.
>
>     -   _Ưu điểm:_ Đơn giản, dễ triển khai, hiệu suất ổn định.
>     -   _Nhược điểm:_ Có thể cắt ngang giữa một đoạn ý nghĩa, khiến chunk bị "cụt" và mất ngữ cảnh.
>
> -   **Semantic Chunking (Cắt theo ngữ nghĩa):** Sử dụng AI hoặc quy tắc ngữ nghĩa để xác định ranh giới tự nhiên giữa
>     các ý. Mỗi chunk chứa trọn vẹn một ý hoặc một chủ đề.
>
>     -   _Cách hoạt động:_ Tính embedding cho từng câu, khi độ tương đồng giữa hai câu liên tiếp giảm mạnh (nghĩa là
>         chủ đề đang chuyển), hệ thống "cắt" tại đó.
>     -   _Ưu điểm:_ Mỗi chunk có ý nghĩa trọn vẹn, embedding chính xác hơn.
>     -   _Nhược điểm:_ Phức tạp hơn, kích thước chunk không đều.
>
> -   **Recursive Chunking (Cắt đệ quy):** Sử dụng hệ thống phân cấp tài liệu (tiêu đề, mục, đoạn) để cắt. Ưu tiên cắt
>     theo tiêu đề > đoạn > câu.
>
>     -   _Ưu điểm:_ Tôn trọng cấu trúc gốc của tài liệu, đặc biệt hiệu quả với tài liệu có format rõ ràng (Markdown,
>         HTML).
>
> -   **Document-based Chunking (Cắt theo tài liệu):** Mỗi tài liệu nhỏ (FAQ, email, phiếu hỗ trợ) là một chunk. Phù hợp
>     khi mỗi tài liệu đã ngắn gọn và tự chứa đủ ngữ cảnh.
>
> **3. Chunking ảnh hưởng đến độ chính xác thế nào?**
>
> -   **Chunk quá lớn:** Embedding trở nên chung chung → tìm kiếm thiếu chính xác. Tốn nhiều token Context Window cho
>     mỗi chunk.
> -   **Chunk quá nhỏ:** Mất ngữ cảnh → AI không hiểu chunk đang nói về gì. _Ví dụ:_ Chunk chỉ chứa "Được bảo hành 12
>     tháng" mà không có "Sản phẩm laptop" → AI không biết cái gì được bảo hành 12 tháng.
> -   **Chunk "vừa đủ":** Đủ lớn để giữ ngữ cảnh, đủ nhỏ để embedding chính xác. Thường dao động từ 200-1000 token tùy
>     loại tài liệu.
>
> **4. Best Practices**
>
> -   Bắt đầu với Fixed-size (500 token, overlap 50) → đánh giá kết quả → chuyển sang Semantic Chunking nếu cần.
> -   Luôn thêm metadata (tiêu đề tài liệu, phần mục) vào mỗi chunk để bổ sung ngữ cảnh.
> -   Test với dữ liệu thực: tạo 20-30 câu hỏi mẫu và kiểm tra xem chunk đúng có được tìm ra không.
>
> _Dòng kiến thức vàng:_ Chunking là "nghệ thuật cắt bánh" — cắt đúng chỗ thì mỗi miếng bánh (chunk) vẫn ngon và trọn
> vẹn, cắt sai thì mỗi miếng chỉ là mẩu vụn không có ý nghĩa. Semantic Chunking là lựa chọn tối ưu nhất vì nó tôn trọng
> ranh giới ngữ nghĩa tự nhiên, nhưng Fixed-size với overlap vẫn là điểm khởi đầu tốt.

-   **Metadata Filtering:** Lọc dữ liệu theo Metadata (Metadata Filtering) giúp ích gì cho RAG?

> **Trả lời:**
>
> **1. Metadata là gì trong ngữ cảnh RAG?**
>
> Metadata là "dữ liệu về dữ liệu" — các thông tin mô tả được gắn kèm mỗi chunk tài liệu khi lưu vào Vector Database. Nó
> không phải nội dung chính, mà là các thuộc tính phân loại giúp lọc và tìm kiếm hiệu quả hơn.
>
> Ví dụ metadata cho một chunk về chính sách bảo hành:
>
> ```json
> {
>     "content": "Sản phẩm laptop được bảo hành 12 tháng...",
>     "metadata": {
>         "source": "chinh-sach-bao-hanh-2024.pdf",
>         "category": "bảo hành",
>         "product_type": "laptop",
>         "effective_date": "2024-01-01",
>         "department": "CSKH"
>     }
> }
> ```
>
> **2. Metadata Filtering hoạt động thế nào?**
>
> Thay vì tìm kiếm trên toàn bộ Vector Database (có thể chứa hàng triệu chunks), Metadata Filtering cho phép thu hẹp
> phạm vi tìm kiếm trước khi thực hiện Semantic Search:
>
> -   **Bước 1 — Lọc (Filter):** Chỉ giữ lại các chunks có metadata phù hợp. _Ví dụ:_ Nếu câu hỏi về bảo hành laptop →
>     lọc `product_type = "laptop"` AND `category = "bảo hành"`.
> -   **Bước 2 — Tìm kiếm ngữ nghĩa (Semantic Search):** Chỉ thực hiện Cosine Similarity trên tập chunks đã được lọc.
>
> **3. Tại sao Metadata Filtering quan trọng?**
>
> -   **Tăng độ chính xác (Precision):** Loại bỏ các chunk không liên quan trước khi tìm kiếm. Không có filter, câu hỏi
>     "Bảo hành laptop" có thể trả về chunk "Bảo hành điện thoại" vì embedding ngữ nghĩa gần nhau (đều nói về bảo hành).
> -   **Giảm thời gian tìm kiếm:** Tìm trong 1.000 chunks thay vì 1.000.000 chunks → nhanh hơn đáng kể.
> -   **Hỗ trợ lọc theo thời gian:** Chỉ lấy tài liệu cập nhật nhất. _Ví dụ:_ Chính sách 2024 thay thế chính sách 2023 →
>     lọc `effective_date >= "2024-01-01"`.
> -   **Kiểm soát quyền truy cập:** Lọc theo phòng ban, vai trò → đảm bảo AI chỉ trả lời dựa trên tài liệu mà người dùng
>     có quyền xem.
>
> **4. Các loại Metadata phổ biến**
>
> | Loại                   | Ví dụ                            | Tác dụng           |
> | ---------------------- | -------------------------------- | ------------------ |
> | Nguồn (Source)         | Tên file, URL gốc                | Trích dẫn nguồn    |
> | Phân loại (Category)   | Bảo hành, vận chuyển, thanh toán | Thu hẹp phạm vi    |
> | Thời gian (Date)       | Ngày tạo, ngày cập nhật          | Ưu tiên mới nhất   |
> | Sản phẩm (Product)     | Laptop, điện thoại, phụ kiện     | Lọc theo sản phẩm  |
> | Phòng ban (Department) | CSKH, Kỹ thuật, Kinh doanh       | Kiểm soát truy cập |
>
> _Dòng kiến thức vàng:_ Metadata Filtering giống như "biển chỉ đường trong thư viện" — thay vì lục tung toàn bộ kệ
> sách, bạn biết chính xác cần đến kệ nào (phòng nào, chủ đề gì, năm nào) trước khi bắt đầu tìm. Đây là kỹ thuật đơn
> giản nhưng mạnh mẽ, giảm đáng kể lỗi tìm kiếm trong RAG.

-   **Semantic Search vs Keyword Matching:** Tìm kiếm theo ngữ nghĩa (Semantic Search) khác gì so với khớp từ khóa
    truyền thống?

> **Trả lời:**
>
> **1. Keyword Matching (Khớp từ khóa) — Cách truyền thống**
>
> -   **Cách hoạt động:** Tìm các tài liệu chứa chính xác từ khóa có trong câu hỏi. Sử dụng các thuật toán như TF-IDF
>     (Term Frequency - Inverse Document Frequency) hoặc BM25.
> -   **Ưu điểm:** Nhanh, đơn giản, chính xác khi tìm thuật ngữ cụ thể (mã sản phẩm, tên riêng, số điện thoại).
> -   **Nhược điểm nghiêm trọng:**
>     -   Không hiểu đồng nghĩa: Tìm "xe hơi" sẽ không tìm được tài liệu viết "ô tô".
>     -   Không hiểu ngữ cảnh: "Apple" là quả táo hay công ty công nghệ?
>     -   Phụ thuộc vào từ ngữ chính xác: Người dùng phải "đoán" đúng từ khóa mà tác giả tài liệu đã dùng.
>
> **2. Semantic Search (Tìm kiếm ngữ nghĩa) — Cách hiện đại**
>
> -   **Cách hoạt động:** Chuyển cả câu hỏi và tài liệu thành Embedding (vector), sau đó tìm kiếm dựa trên "khoảng cách"
>     giữa các vector — tức so sánh ý nghĩa, không so sánh từ ngữ.
> -   **Ưu điểm:**
>     -   Hiểu đồng nghĩa: "xe hơi" tìm được "ô tô", "automobile", "xế hộp".
>     -   Hiểu ý định: "Làm sao hết đau đầu?" tìm được tài liệu về "cách giảm triệu chứng đau đầu" dù không khớp từ
>         khóa.
>     -   Đa ngôn ngữ: Với embedding model đa ngữ, câu hỏi tiếng Việt có thể tìm được tài liệu tiếng Anh có cùng ý
>         nghĩa.
> -   **Nhược điểm:**
>     -   Chậm hơn keyword matching (cần tính toán vector).
>     -   Có thể bỏ sót kết quả chính xác: tìm "mã đơn hàng ABC123" bằng semantic search có thể không tối ưu bằng
>         keyword matching.
>     -   Phụ thuộc vào chất lượng Embedding Model.
>
> **3. So sánh trực quan**
>
> | Đặc điểm                 | Keyword Matching | Semantic Search            |
> | ------------------------ | ---------------- | -------------------------- |
> | Cơ chế                   | So sánh từ ngữ   | So sánh ý nghĩa            |
> | "Xe hơi" tìm "ô tô"?     | Không            | Có                         |
> | Tốc độ                   | Rất nhanh        | Nhanh (nhờ ANN index)      |
> | Tìm mã cụ thể (SKU, ID)? | Rất tốt          | Kém                        |
> | Hiểu ngữ cảnh?           | Không            | Có                         |
> | Chi phí                  | Thấp             | Trung bình (cần embedding) |
>
> **4. Hybrid Search — Giải pháp tối ưu**
>
> Trong thực tế, hệ thống RAG hiện đại thường kết hợp cả hai:
>
> -   **Bước 1:** Chạy Semantic Search để tìm các chunk liên quan về ý nghĩa.
> -   **Bước 2:** Chạy Keyword Matching (BM25) để tìm các chunk chứa từ khóa chính xác.
> -   **Bước 3:** Kết hợp (merge) hai danh sách kết quả bằng thuật toán Reciprocal Rank Fusion (RRF) hoặc weighted
>     scoring.
>
> _Ví dụ:_ Câu hỏi "Chính sách đổi trả sản phẩm ABC-2024" → Semantic Search tìm các chunk về "đổi trả, hoàn tiền" +
> Keyword Matching tìm chunk chứa chính xác "ABC-2024" → Kết hợp cho kết quả chính xác nhất.
>
> _Dòng kiến thức vàng:_ Keyword Matching tìm theo "chữ", Semantic Search tìm theo "nghĩa". Mỗi cách có điểm mạnh riêng.
> Giải pháp tối ưu là Hybrid Search — kết hợp cả hai để vừa hiểu ý định vừa khớp chính xác, giống như tra Google vừa
> hiểu câu hỏi vừa khớp từ khóa.

-   **Re-ranking:** Kỹ thuật Re-ranking (chấm điểm lại) giúp cải thiện kết quả tìm kiếm như thế nào?

> **Trả lời:**
>
> **1. Re-ranking là gì?**
>
> Re-ranking (Chấm điểm lại) là bước bổ sung sau Semantic Search, sử dụng một mô hình AI chuyên biệt (Cross-Encoder) để
> đánh giá lại và sắp xếp lại thứ tự các chunk đã tìm được, đẩy các chunk thực sự liên quan nhất lên đầu.
>
> -   _Ẩn dụ:_ Semantic Search giống như "vòng sơ tuyển" — chọn nhanh 20 ứng viên từ 10.000 hồ sơ. Re-ranking giống như
>     "vòng phỏng vấn kỹ" — đánh giá chi tiết 20 ứng viên đó để chọn ra Top 5 thực sự phù hợp nhất.
>
> **2. Tại sao cần Re-ranking? Semantic Search chưa đủ tốt sao?**
>
> Semantic Search sử dụng Bi-Encoder: mã hóa câu hỏi và tài liệu thành embedding độc lập, rồi so sánh khoảng cách. Cách
> này nhanh nhưng "thô" vì:
>
> -   Câu hỏi và tài liệu không "nhìn thấy nhau" trong quá trình mã hóa.
> -   Embedding phải "nén" toàn bộ ý nghĩa vào một vector cố định → mất nuance (sắc thái).
>
> Re-ranking sử dụng Cross-Encoder: nhận đồng thời cả câu hỏi VÀ tài liệu làm đầu vào, so sánh trực tiếp từng từ. Cách
> này chậm hơn nhưng chính xác hơn nhiều vì mô hình "thấy" được mối quan hệ cụ thể giữa câu hỏi và từng chunk.
>
> **3. Quy trình Re-ranking trong RAG**
>
> ```
> Câu hỏi → Semantic Search → Top-20 chunks (sơ tuyển nhanh)
>                                    ↓
>                            Cross-Encoder Re-ranker
>                                    ↓
>                           Top-5 chunks (chấm điểm lại)
>                                    ↓
>                            Đưa vào LLM để Generate
> ```
>
> **4. Ví dụ thực tế**
>
> Câu hỏi: "Làm sao để huỷ đơn hàng đã thanh toán?"
>
> Semantic Search trả về Top-5:
>
> 1. "Quy trình huỷ đơn hàng chưa thanh toán" (gần nghĩa nhưng sai điều kiện)
> 2. "Chính sách hoàn tiền khi huỷ đơn đã thanh toán" (đúng)
> 3. "Cách theo dõi đơn hàng" (ít liên quan)
> 4. "Hướng dẫn huỷ đơn hàng đã thanh toán" (rất đúng)
> 5. "Chính sách thanh toán trả góp" (không liên quan)
>
> Sau Re-ranking, Cross-Encoder sắp xếp lại:
>
> 1. "Hướng dẫn huỷ đơn hàng đã thanh toán" (đẩy lên đầu)
> 2. "Chính sách hoàn tiền khi huỷ đơn đã thanh toán"
> 3. "Quy trình huỷ đơn hàng chưa thanh toán"
>
> **5. Các Re-ranker phổ biến**
>
> -   **Cohere Rerank:** API dễ dùng, hiệu suất cao, hỗ trợ đa ngữ.
> -   **BGE Reranker (BAAI):** Mã nguồn mở, tự host được.
> -   **Cross-Encoder models trên HuggingFace:** Nhiều lựa chọn cho các ngôn ngữ khác nhau.
>
> _Dòng kiến thức vàng:_ Re-ranking là "bước kiểm tra chất lượng" sau khi tìm kiếm — nó đánh đổi tốc độ lấy độ chính xác
> bằng cách so sánh trực tiếp câu hỏi với từng kết quả thay vì chỉ so sánh vector. Trong hệ thống RAG nghiêm túc,
> Re-ranking có thể cải thiện độ chính xác Retrieval từ 10-30%.

-   **Grounding in RAG:** Kỹ thuật neo câu trả lời (Grounding) vào dữ liệu tìm được hoạt động ra sao?

> **Trả lời:**
>
> **1. Grounding trong RAG là gì?**
>
> Grounding trong RAG là kỹ thuật buộc LLM chỉ tạo câu trả lời dựa trên các chunks tài liệu đã được tìm kiếm (retrieved
> context), thay vì dựa vào kiến thức nén từ quá trình huấn luyện. Đây chính là phiên bản tự động hóa của Grounding
> Prompting đã học ở Module 2, nhưng được tích hợp trực tiếp vào pipeline RAG.
>
> **2. Cách hoạt động**
>
> Grounding trong RAG được thực hiện thông qua 3 cơ chế:
>
> -   **Chỉ dẫn trong System Prompt:**
>
>     ```
>     Bạn là trợ lý AI. CHỈ trả lời dựa trên tài liệu được cung cấp trong thẻ <context>.
>     Nếu tài liệu không chứa đủ thông tin để trả lời, hãy nói:
>     "Tôi không tìm thấy thông tin này trong tài liệu hiện có."
>     KHÔNG BAO GIỜ bịa đặt hoặc sử dụng kiến thức ngoài tài liệu.
>     ```
>
> -   **Yêu cầu trích dẫn nguồn (Citation):** Yêu cầu AI trích dẫn chính xác đoạn tài liệu nào hỗ trợ cho mỗi tuyên bố
>     trong câu trả lời. _Ví dụ:_ "Sản phẩm được bảo hành 12 tháng [Nguồn: chinh-sach-bao-hanh.pdf, trang 3]."
>
> -   **Chỉ dẫn thừa nhận giới hạn:** Cho phép và khuyến khích AI nói "Tôi không biết" thay vì bịa. Điều này cực kỳ quan
>     trọng vì LLM mặc định bị áp lực phải luôn trả lời (do quá trình RLHF), dẫn đến ảo giác khi không có dữ liệu.
>
> **3. Tại sao Grounding quan trọng trong RAG?**
>
> -   **Giảm ảo giác có cơ sở (Grounded Hallucination):** Đây là loại ảo giác nguy hiểm nhất — AI có tài liệu tham chiếu
>     nhưng vẫn "thêm mắm thêm muối" vào câu trả lời. Grounding giảm thiểu điều này.
> -   **Tăng tính kiểm chứng (Verifiability):** Khi có trích dẫn nguồn, người dùng có thể tự kiểm tra tính chính xác.
> -   **Tuân thủ pháp lý:** Trong các lĩnh vực y tế, tài chính, pháp lý — AI bịa thông tin có thể gây hậu quả nghiêm
>     trọng. Grounding là lớp bảo vệ bắt buộc.
>
> **4. Thách thức của Grounding**
>
> -   **AI vẫn có thể "suy diễn" quá xa:** Dù được yêu cầu chỉ dựa trên tài liệu, LLM đôi khi vẫn "suy luận" ra thông
>     tin không có trong context.
> -   **Context chưa đủ:** Nếu bước Retrieve tìm sai hoặc thiếu chunk quan trọng, AI bị buộc vào "tài liệu sai" → trả
>     lời sai nhưng có trích dẫn, tạo cảm giác tin cậy giả.
>
> _Dòng kiến thức vàng:_ Grounding trong RAG giống như quy tắc "nói có sách, mách có chứng" — AI phải trích dẫn nguồn
> cho mọi tuyên bố và thừa nhận khi không biết. Đây là lớp bảo vệ quan trọng nhất chống ảo giác trong hệ thống RAG,
> nhưng hiệu quả phụ thuộc vào chất lượng của bước Retrieve trước đó.

-   **Garbage In, Garbage Out:** Nguyên lý "Rác vào - Rác ra" áp dụng thế nào trong dữ liệu cho RAG? RAG vs Fine-tuning:
    Khi nào nên sử dụng RAG và khi nào nên sử dụng Fine-tuning?

> **Trả lời:**
>
> **Phần A: Garbage In, Garbage Out (GIGO) trong RAG**
>
> **1. Nguyên lý GIGO là gì?**
>
> "Garbage In, Garbage Out" (Rác vào — Rác ra) là nguyên lý kinh điển trong khoa học máy tính: nếu dữ liệu đầu vào kém
> chất lượng, kết quả đầu ra chắc chắn sẽ kém chất lượng, bất kể thuật toán xử lý tốt đến đâu. Trong RAG, nguyên lý này
> áp dụng ở mọi tầng:
>
> **2. GIGO ở từng bước của RAG**
>
> -   **Tài liệu gốc kém:** Nếu Knowledge Base chứa thông tin lỗi thời, mâu thuẫn hoặc sai sự thật → AI sẽ trả lời sai
>     nhưng với sự tự tin cao vì "có tài liệu tham chiếu". Đây là loại sai nguy hiểm nhất vì khó phát hiện.
> -   **Chunking tồi:** Nếu cắt chunk giữa chừng một ý → embedding không phản ánh đúng nội dung → tìm kiếm sai → câu trả
>     lời lệch hướng.
> -   **Embedding kém:** Nếu dùng embedding model không phù hợp (ví dụ: model tiếng Anh cho tài liệu tiếng Việt) →
>     vector không biểu diễn đúng ngữ nghĩa → tìm kiếm ngữ nghĩa thất bại.
> -   **Metadata thiếu hoặc sai:** Nếu metadata gán sai category hoặc không có metadata → không thể lọc chính xác.
>
> **3. Cách phòng chống GIGO**
>
> -   **Kiểm duyệt tài liệu đầu vào:** Review và cập nhật Knowledge Base thường xuyên. Xóa tài liệu lỗi thời.
> -   **Loại bỏ trùng lặp (Deduplication):** Tránh nhiều chunk nói cùng một nội dung nhưng khác nhau chút ít → gây
>     "nhiễu" cho kết quả tìm kiếm.
> -   **Đánh giá pipeline end-to-end:** Tạo bộ câu hỏi test và kiểm tra xem RAG có tìm đúng chunk và trả lời đúng không.
>
> ---
>
> **Phần B: RAG vs Fine-tuning — Khi nào dùng gì? (Chi tiết)**
>
> **1. Dùng RAG khi:**
>
> -   Dữ liệu thay đổi thường xuyên (hàng ngày/tuần): giá cả, chính sách, tin tức, tình trạng kho.
> -   Cần trích dẫn nguồn (citation) để người dùng kiểm chứng.
> -   Ngân sách hạn chế — RAG không cần GPU để huấn luyện.
> -   Cần kiểm soát chặt nội dung AI được phép nói (chỉ dựa trên tài liệu đã duyệt).
> -   _Ví dụ:_ Chatbot CSKH tra cứu chính sách bảo hành, trợ lý nội bộ tra cứu quy trình công ty.
>
> **2. Dùng Fine-tuning khi:**
>
> -   Cần AI nói giọng chuyên ngành (thuật ngữ y tế, pháp lý, kỹ thuật) mà mô hình gốc không quen.
> -   Cần thay đổi phong cách/hành vi sâu (luôn trả lời bằng JSON, luôn dùng tiếng Việt formal).
> -   Dữ liệu ổn định, ít thay đổi (kiến thức chuyên môn, quy chuẩn ngành).
> -   Cần phản hồi nhanh (không có bước tìm kiếm, giảm latency).
> -   _Ví dụ:_ Mô hình chuyên viết hợp đồng pháp lý, mô hình phân tích ảnh y khoa.
>
> **3. Kết hợp RAG + Fine-tuning khi:**
>
> -   Cần cả phong cách chuyên biệt VÀ dữ liệu cập nhật.
> -   _Ví dụ:_ Fine-tune để AI nói giọng bác sĩ + RAG để tra cứu phác đồ điều trị mới nhất.
>
> _Dòng kiến thức vàng:_ GIGO là kẻ thù số 1 của RAG — dù pipeline có tối ưu đến đâu, nếu tài liệu đầu vào "rác" thì kết
> quả cũng "rác". RAG giống như "cho AI mượn sách" (nhanh, rẻ, dễ cập nhật), Fine-tuning giống "cho AI đi học" (sâu,
> chuyên biệt, tốn kém). Trong thực tế, hầu hết dự án nên bắt đầu với RAG vì chi phí thấp và dễ iterate, chỉ chuyển sang
> Fine-tuning khi RAG chứng minh là không đủ.

#### RAG Failure Modes (Các điểm chết của RAG)

-   **Retrieval Error (Lỗi tìm kiếm):** Tại sao khi hệ thống tìm sai đoạn tài liệu (do cắt đoạn chunking tồi hoặc từ
    khóa không khớp), AI lại dễ bị "ảo giác" hoặc trả lời sai theo dữ liệu rác đó?

> **Trả lời:**
>
> **1. Retrieval Error là gì?**
>
> Retrieval Error (Lỗi tìm kiếm) xảy ra khi bước Retrieve trong pipeline RAG tìm sai hoặc thiếu các chunks tài liệu liên
> quan. Đây là "điểm chết" nghiêm trọng nhất của RAG vì nó ảnh hưởng dây chuyền: tìm sai → augment sai → generate sai.
>
> **2. Các nguyên nhân gây Retrieval Error**
>
> -   **Chunking tồi:** Cắt chunk giữa chừng một ý → chunk mất ngữ cảnh → embedding không đại diện cho nội dung thực.
>     -   _Ví dụ:_ Chunk 1: "Sản phẩm được bảo hành". Chunk 2: "12 tháng kể từ ngày mua." → Câu hỏi "Bảo hành bao lâu?"
>         có thể tìm chunk 1 nhưng chunk 1 không chứa "12 tháng".
> -   **Embedding model không phù hợp:** Dùng model tiếng Anh cho tài liệu tiếng Việt, hoặc model tổng quát cho tài liệu
>     chuyên ngành (y tế, pháp lý).
> -   **Câu hỏi mơ hồ:** Người dùng hỏi "Làm sao để hủy?" → "hủy" cái gì? Đơn hàng? Tài khoản? Gói cước? → Hệ thống tìm
>     lung tung.
> -   **Thiếu metadata filtering:** Không lọc theo phân loại → chunk về sản phẩm A bị lẫn với chunk về sản phẩm B.
>
> **3. Tại sao AI "tin" vào dữ liệu rác?**
>
> Đây là cơ chế quan trọng cần hiểu:
>
> -   **Grounding tạo ra "niềm tin mù quáng":** Khi bạn yêu cầu AI chỉ trả lời dựa trên context được cung cấp, AI sẽ
>     "tin tưởng" context đó là đúng — bất kể nội dung thực sự có liên quan hay không. Nếu context chứa đoạn sai, AI sẽ
>     trích dẫn đoạn sai đó một cách tự tin.
> -   **LLM rất giỏi "kể chuyện mạch lạc":** Ngay cả khi context không liên quan, LLM có khả năng "nối" các mảnh thông
>     tin rời rạc thành một câu trả lời nghe hợp lý. Điều này tạo ra ảo giác tinh vi — câu trả lời trôi chảy nhưng hoàn
>     toàn sai.
> -   **Thiếu cơ chế từ chối:** Nếu System Prompt không yêu cầu rõ ràng "nói không biết khi không đủ thông tin", AI sẽ
>     cố gắng trả lời bằng mọi giá.
>
> **4. Cách giảm thiểu Retrieval Error**
>
> -   **Cải thiện Chunking:** Dùng Semantic Chunking hoặc Recursive Chunking thay vì Fixed-size đơn giản.
> -   **Thêm Re-ranking:** Lọc bỏ chunk không liên quan sau tìm kiếm.
> -   **Thiết lập ngưỡng điểm (Score Threshold):** Chỉ chấp nhận chunks có Cosine Similarity trên ngưỡng nhất định (ví
>     dụ: > 0.7). Nếu không chunk nào đạt ngưỡng → trả lời "Không tìm thấy thông tin".
> -   **Query Expansion:** Viết lại câu hỏi của người dùng thành nhiều phiên bản (paraphrase) để tăng cơ hội tìm đúng
>     chunk.
> -   **Đánh giá thường xuyên:** Xây dựng bộ test "câu hỏi → chunk mong đợi" và đo Recall/Precision.
>
> _Dòng kiến thức vàng:_ Retrieval Error là "lỗi gốc" của RAG — nếu tìm sai tài liệu, mọi bước sau đều vô ích. Nguy hiểm
> hơn, AI được Grounding sẽ "tin tưởng tuyệt đối" vào context sai và tạo ra câu trả lời sai nhưng nghe rất tự tin có dẫn
> nguồn. Phòng chống bằng cách: cải thiện chunking, thêm re-ranking, đặt score threshold, và luôn cho phép AI "nói không
> biết".

-   **Context Conflict:** Khi thông tin trong tài liệu RAG mâu thuẫn với "kiến thức nền" mà AI đã được học từ trước, AI
    sẽ ưu tiên cái nào?

> **Trả lời:**
>
> **1. Context Conflict là gì?**
>
> Context Conflict (Xung đột ngữ cảnh) xảy ra khi thông tin trong tài liệu RAG (retrieved context) mâu thuẫn với kiến
> thức nén (parametric knowledge) mà LLM đã học trong quá trình huấn luyện.
>
> _Ví dụ:_
>
> -   Kiến thức nén của AI: "Thủ đô của Úc là Canberra" (đúng).
> -   Tài liệu RAG (sai hoặc lỗi thời): "Thủ đô của Úc là Sydney."
> -   Câu hỏi: "Thủ đô của Úc là gì?" → AI sẽ trả lời gì?
>
> **2. AI ưu tiên cái nào?**
>
> Câu trả lời phức tạp hơn nhiều người nghĩ, phụ thuộc vào nhiều yếu tố:
>
> -   **Nếu Grounding chặt (System Prompt yêu cầu chỉ dựa vào context):** AI sẽ nghiêng về tài liệu RAG → trả lời
>     "Sydney" → **SAI**. Đây chính là mặt trái của Grounding: nó tạo ra "niềm tin mù quáng" vào context.
> -   **Nếu Grounding lỏng hoặc không có:** AI sẽ dựa nhiều hơn vào kiến thức nén → trả lời "Canberra" → **ĐÚNG** trong
>     trường hợp này, nhưng sẽ bỏ qua tài liệu (mất ý nghĩa của RAG).
> -   **Mức độ "tự tin" của kiến thức nén:** Với sự thật phổ biến (thủ đô, toán học), AI có xu hướng giữ kiến thức nén
>     dù context nói khác. Với thông tin chuyên biệt (chính sách nội bộ công ty), AI dễ bị context chi phối hơn.
>
> **3. Các loại Context Conflict**
>
> -   **Tài liệu sai, kiến thức nền đúng:** Tài liệu lỗi thời hoặc có lỗi → AI cần bỏ qua tài liệu, nhưng Grounding ngăn
>     cản điều này.
> -   **Tài liệu đúng, kiến thức nền sai/lỗi thời:** Tài liệu chứa thông tin mới hơn dữ liệu huấn luyện (knowledge
>     cutoff) → AI cần ưu tiên tài liệu, và Grounding giúp điều này.
> -   **Cả hai đều đúng nhưng ở ngữ cảnh khác:** _Ví dụ:_ Tài liệu nói "Sản phẩm giá 500.000 VND" (giá nội bộ) nhưng AI
>     biết giá thị trường là 600.000 VND → cả hai đều đúng ở ngữ cảnh khác nhau.
>
> **4. Cách xử lý Context Conflict**
>
> -   **Thiết kế System Prompt thông minh:** Thay vì Grounding tuyệt đối ("chỉ dựa vào tài liệu"), dùng Grounding có
>     điều kiện: "Ưu tiên tài liệu được cung cấp. Nếu tài liệu có vẻ mâu thuẫn với sự thật phổ biến, hãy lưu ý người
>     dùng về sự khác biệt."
> -   **Kiểm soát chất lượng Knowledge Base:** Đây là giải pháp gốc — đảm bảo tài liệu đúng ngay từ đầu thì sẽ không có
>     conflict.
> -   **Thêm metadata thời gian:** Gắn ngày tạo/cập nhật cho mỗi chunk. AI có thể cảnh báo: "Thông tin này từ tài liệu
>     ngày X, có thể đã thay đổi."
> -   **Cho phép AI cảnh báo mâu thuẫn:** Yêu cầu AI nêu rõ khi phát hiện conflict giữa context và kiến thức nền, để
>     người dùng tự quyết định.
>
> _Dòng kiến thức vàng:_ Context Conflict là bài toán "tin ai?" — tin tài liệu RAG hay tin kiến thức nền? Không có câu
> trả lời tuyệt đối. Giải pháp tối ưu là: giữ Knowledge Base sạch (loại bỏ mâu thuẫn từ gốc), dùng Grounding có điều
> kiện (ưu tiên tài liệu nhưng cho phép cảnh báo), và thiết kế AI biết "đặt câu hỏi" khi gặp thông tin mâu thuẫn thay vì
> im lặng chọn một bên.

### 3. Fine-tuning (Phần tìm hiểu sâu hơn dành riêng cho đội Tech)

-   **Fine-tuning Mechanism:** Quá trình dạy lại mô hình (Fine-tuning) với dữ liệu được dán nhãn diễn ra như thế nào?

> **Trả lời:**
>
> **1. Tổng quan quy trình Fine-tuning**
>
> Fine-tuning là quá trình huấn luyện thêm một mô hình Pre-trained (đã được đào tạo trên dữ liệu khổng lồ) bằng dữ liệu
> chuyên biệt của bạn, để mô hình "thấm nhuần" kiến thức và phong cách mới vào chính các tham số (weights) của nó.
>
> ```
> Mô hình Pre-trained (GPT-4, LLaMA, Mistral...)
>       ↓
> + Dữ liệu chuyên biệt (có dán nhãn)
>       ↓
> Huấn luyện thêm (cập nhật weights)
>       ↓
> Mô hình Fine-tuned (chuyên biệt hơn)
> ```
>
> **2. Dữ liệu dán nhãn (Labeled Data) là gì?**
>
> Dữ liệu dán nhãn là các cặp ví dụ (input → output mong muốn) mà bạn muốn AI học theo. Chất lượng và số lượng dữ liệu
> quyết định trực tiếp chất lượng mô hình sau fine-tuning.
>
> Các định dạng phổ biến:
>
> -   **Instruction-following (Hướng dẫn):** Cặp "câu hỏi/yêu cầu → câu trả lời mẫu".
>     ```json
>     {
>         "instruction": "Tóm tắt hợp đồng sau",
>         "input": "<nội dung hợp đồng>",
>         "output": "Tóm tắt: Hợp đồng thuê văn phòng..."
>     }
>     ```
> -   **Conversational (Hội thoại):** Chuỗi hội thoại mẫu giữa user và assistant.
>     ```json
>     {
>         "messages": [
>             { "role": "user", "content": "Tôi muốn hủy đơn hàng" },
>             { "role": "assistant", "content": "Dạ, em xin phép hỏi anh/chị mã đơn hàng ạ?" }
>         ]
>     }
>     ```
> -   **Classification (Phân loại):** Cặp "đầu vào → nhãn phân loại".
>
> **3. Quy trình Fine-tuning chi tiết**
>
> -   **Bước 1 — Chuẩn bị dữ liệu:** Thu thập, dọn dẹp và format dữ liệu thành cặp input-output. Thường cần từ vài trăm
>     đến vài nghìn ví dụ chất lượng cao.
> -   **Bước 2 — Chọn mô hình nền (Base Model):** Chọn mô hình pre-trained phù hợp (LLaMA, Mistral, GPT-3.5-turbo...).
>     Mô hình càng mạnh, kết quả fine-tuning càng tốt.
> -   **Bước 3 — Huấn luyện (Training):** Chạy dữ liệu qua mô hình, tính Loss (sai số giữa output mô hình và output mong
>     muốn), và cập nhật weights bằng thuật toán Gradient Descent. Quá trình này lặp lại nhiều Epoch (vòng lặp) cho đến
>     khi Loss giảm đến mức chấp nhận được.
> -   **Bước 4 — Đánh giá (Evaluation):** Test mô hình trên tập dữ liệu chưa từng thấy (test set) để đo hiệu suất thực
>     tế.
> -   **Bước 5 — Triển khai (Deployment):** Đưa mô hình fine-tuned vào production.
>
> **4. Các thông số quan trọng**
>
> -   **Learning Rate:** Tốc độ cập nhật weights. Quá cao → mô hình "quên" kiến thức cũ. Quá thấp → học quá chậm.
> -   **Epoch:** Số lần mô hình "đọc" qua toàn bộ dữ liệu huấn luyện. Thường 1-5 epoch cho LLM.
> -   **Batch Size:** Số ví dụ được xử lý cùng lúc trong một lần cập nhật weights.
>
> **5. Các nền tảng Fine-tuning phổ biến**
>
> -   **OpenAI Fine-tuning API:** Dễ dùng nhất, upload dữ liệu và chờ kết quả. Chi phí trả theo token.
> -   **HuggingFace + Transformers:** Mã nguồn mở, linh hoạt nhất, cần GPU riêng.
> -   **Google Vertex AI:** Fine-tuning trên cloud, tích hợp tốt với hệ sinh thái Google.
> -   **Together AI, Fireworks AI:** Nền tảng cloud chuyên fine-tuning, cân bằng giữa dễ dùng và linh hoạt.
>
> _Dòng kiến thức vàng:_ Fine-tuning là "dạy AI bằng ví dụ" — bạn cho nó xem hàng trăm cặp câu hỏi-trả lời mẫu, và nó sẽ
> cập nhật chính bộ não (weights) để phản xạ giống như ví dụ mẫu. Chất lượng dữ liệu là yếu tố quyết định: 500 ví dụ tốt
> tốt hơn 10.000 ví dụ rác.

-   **PEFT & LoRA/QLoRA:** Các kỹ thuật PEFT, LoRA và QLoRA giúp tinh chỉnh mô hình hiệu quả và tiết kiệm tài nguyên như
    thế nào?

> **Trả lời:**
>
> **1. Vấn đề: Full Fine-tuning quá tốn kém**
>
> Một mô hình LLM lớn có hàng tỷ tham số (parameters). Ví dụ: LLaMA 2 70B có 70 tỷ tham số. Full Fine-tuning cập nhật
> TẤT CẢ tham số → cần GPU cực mạnh (nhiều A100/H100), tốn hàng nghìn USD cho một lần train. Điều này không khả thi cho
> đa số doanh nghiệp.
>
> **2. PEFT (Parameter-Efficient Fine-Tuning) — Giải pháp**
>
> PEFT là nhóm các kỹ thuật chỉ cập nhật một phần nhỏ tham số của mô hình (thường < 1%) thay vì toàn bộ, trong khi vẫn
> đạt hiệu suất gần tương đương Full Fine-tuning.
>
> -   _Ẩn dụ:_ Thay vì xây lại cả ngôi nhà (Full Fine-tuning), bạn chỉ cần sơn lại tường và thay nội thất (PEFT) — chi
>     phí giảm 90% nhưng kết quả gần như tương đương.
>
> **3. LoRA (Low-Rank Adaptation) — Kỹ thuật PEFT phổ biến nhất**
>
> -   **Cách hoạt động:** Thay vì cập nhật ma trận trọng số khổng lồ (ví dụ: 4096×4096 = 16 triệu tham số), LoRA "đóng
>     băng" ma trận gốc và thêm hai ma trận nhỏ (low-rank) bên cạnh. Ví dụ: thay vì cập nhật ma trận 4096×4096, LoRA chỉ
>     thêm hai ma trận 4096×16 và 16×4096 (tổng cộng ~130 nghìn tham số thay vì 16 triệu).
> -   **Kết quả:** Chỉ cần huấn luyện ~0.1-1% số tham số gốc, giảm yêu cầu GPU từ 8×A100 xuống còn 1-2 GPU thông thường.
> -   **Ưu điểm:**
>     -   Giảm chi phí tính toán 10-100 lần.
>     -   Dễ dàng lưu trữ và chuyển đổi: "adapter" LoRA chỉ vài chục MB, có thể nạp/tháo nhanh trên cùng một mô hình
>         nền.
>     -   Giảm nguy cơ Catastrophic Forgetting vì phần lớn kiến thức gốc được giữ nguyên.
>
> **4. QLoRA (Quantized LoRA) — LoRA tiết kiệm hơn nữa**
>
> -   **Cách hoạt động:** Kết hợp LoRA với kỹ thuật Quantization (lượng tử hóa) — nén mô hình gốc từ 16-bit xuống 4-bit
>     trước khi áp dụng LoRA.
> -   **Kết quả:** Fine-tune mô hình 70B tham số trên một GPU 48GB (A6000) thay vì cần cluster GPU hàng trăm GB.
> -   **Bù đắp:** Quantization gây mất mát chất lượng nhỏ, nhưng LoRA bù đắp phần lớn bằng cách tinh chỉnh thêm.
>
> **5. So sánh**
>
> | Kỹ thuật         | Tham số cập nhật     | GPU cần thiết | Chi phí  | Chất lượng       |
> | ---------------- | -------------------- | ------------- | -------- | ---------------- |
> | Full Fine-tuning | 100%                 | Cluster GPU   | Rất cao  | Tốt nhất         |
> | LoRA             | ~0.1-1%              | 1-2 GPU       | Thấp     | Gần bằng Full FT |
> | QLoRA            | ~0.1-1% (+ quantize) | 1 GPU         | Rất thấp | Gần bằng LoRA    |
>
> _Dòng kiến thức vàng:_ LoRA và QLoRA là "phép màu" giúp dân chủ hóa Fine-tuning — cho phép doanh nghiệp nhỏ với một
> GPU cũng có thể tinh chỉnh mô hình hàng tỷ tham số. Nguyên lý: thay vì sửa cả bộ não, chỉ cần gắn thêm một "bộ nhớ
> phụ" nhỏ chuyên biệt.

-   **Catastrophic Forgetting:** Hiện tượng "Quên kiến thức cũ" (Catastrophic forgetting) là gì và làm sao để hạn chế?

> **Trả lời:**
>
> **1. Catastrophic Forgetting là gì?**
>
> Catastrophic Forgetting (Quên thảm họa) là hiện tượng khi một mô hình AI được fine-tuning trên dữ liệu mới, nó "quên"
> đáng kể kiến thức đã học từ trước. Mô hình trở nên giỏi trong lĩnh vực mới nhưng mất đi khả năng xử lý các tác vụ tổng
> quát hoặc lĩnh vực cũ.
>
> -   _Ẩn dụ:_ Giống như một bác sĩ đa khoa đi học chuyên khoa tim mạch quá chuyên sâu, đến mức quên cách khám các bệnh
>     thông thường khác.
>
> **2. Tại sao xảy ra Catastrophic Forgetting?**
>
> -   **Cơ chế cập nhật weights:** Khi fine-tuning, thuật toán Gradient Descent cập nhật các weights để giảm Loss trên
>     dữ liệu mới. Nhưng các weights này CŨNG là nơi lưu trữ kiến thức cũ. Cập nhật quá mạnh → ghi đè kiến thức cũ.
> -   **Dữ liệu fine-tuning hẹp:** Nếu dữ liệu fine-tuning chỉ tập trung vào một lĩnh vực nhỏ (ví dụ: chỉ toàn câu hỏi y
>     tế), mô hình sẽ "tối ưu" cho y tế nhưng "quên" cách xử lý toán, lập trình, viết văn.
>
> **3. Ví dụ thực tế**
>
> -   Trước fine-tuning: AI trả lời tốt câu hỏi tiếng Anh, tiếng Việt, toán, lập trình.
> -   Fine-tuning trên 10.000 cặp hỏi-đáp y tế tiếng Việt.
> -   Sau fine-tuning: AI trả lời y tế tiếng Việt rất tốt, nhưng đột nhiên trả lời tiếng Anh kém hơn, và khả năng lập
>     trình giảm sút rõ rệt.
>
> **4. Cách hạn chế Catastrophic Forgetting**
>
> -   **Sử dụng PEFT/LoRA:** Vì chỉ cập nhật ~1% tham số, 99% kiến thức gốc được giữ nguyên. Đây là cách hiệu quả nhất
>     và phổ biến nhất hiện nay.
> -   **Learning Rate thấp:** Cập nhật weights nhẹ nhàng, tránh ghi đè quá mạnh lên kiến thức cũ.
> -   **Ít Epoch:** Chỉ train 1-3 epoch thay vì 10-20 epoch, đủ để mô hình "hiểu" dữ liệu mới mà không "quên" kiến thức
>     cũ.
> -   **Trộn dữ liệu (Data Mixing):** Trộn dữ liệu fine-tuning chuyên biệt với một phần dữ liệu tổng quát (general
>     data). _Ví dụ:_ 70% dữ liệu y tế + 30% dữ liệu tổng quát (hội thoại, toán, lập trình).
> -   **Regularization:** Thêm ràng buộc để weights mới không được lệch quá xa so với weights gốc.
> -   **Evaluation trên nhiều lĩnh vực:** Sau fine-tuning, test không chỉ trên lĩnh vực mới mà cả trên benchmark tổng
>     quát để phát hiện suy giảm.
>
> _Dòng kiến thức vàng:_ Catastrophic Forgetting là "cái giá" của Fine-tuning — dạy AI thêm kiến thức mới có nguy cơ làm
> mất kiến thức cũ. LoRA/QLoRA là giải pháp tốt nhất vì chỉ cập nhật phần nhỏ tham số. Quy tắc vàng: learning rate thấp,
> ít epoch, trộn dữ liệu, và luôn test trên benchmark tổng quát sau khi fine-tuning.

-   **Domain Adaptation:** Huấn luyện thích ứng miền (Domain Adaptation) là gì?

> **Trả lời:**
>
> **1. Domain Adaptation là gì?**
>
> Domain Adaptation (Thích ứng miền) là quá trình điều chỉnh một mô hình AI tổng quát để nó hoạt động tốt hơn trong một
> "miền" (domain) chuyên biệt cụ thể — một lĩnh vực, ngành nghề, hoặc ngữ cảnh sử dụng riêng biệt.
>
> -   _"Miền" (Domain):_ Là tập hợp ngôn ngữ, thuật ngữ, phong cách và quy tắc đặc thù của một lĩnh vực. Ví dụ: miền y
>     tế, miền pháp lý, miền tài chính, miền kỹ thuật phần mềm — mỗi miền có "ngôn ngữ riêng" mà mô hình tổng quát có
>     thể không nắm vững.
>
> **2. Tại sao cần Domain Adaptation?**
>
> -   **Mô hình tổng quát thiếu chiều sâu:** GPT-4 hay Claude biết "một chút" về mọi thứ, nhưng không phải chuyên gia y
>     tế hay luật sư. Chúng có thể dùng sai thuật ngữ, hiểu nhầm ngữ cảnh chuyên ngành, hoặc không biết các quy tắc đặc
>     thù.
> -   **Ngôn ngữ chuyên ngành:** Một tài liệu y tế viết "BN nữ 45T, tiền sử THA, DM type 2, hiện tại khó thở NYHA III" →
>     mô hình tổng quát có thể không hiểu viết tắt chuyên ngành.
> -   **Quy tắc đặc thù:** Trong lĩnh vực pháp lý, cách trích dẫn điều luật, cấu trúc văn bản có quy chuẩn riêng mà mô
>     hình cần "học".
>
> **3. Các cách thực hiện Domain Adaptation**
>
> -   **Continued Pre-training (Tiền huấn luyện tiếp):** Cho mô hình "đọc" hàng triệu trang tài liệu chuyên ngành (không
>     cần dán nhãn). Mô hình sẽ "thấm" thuật ngữ, cấu trúc ngôn ngữ và kiến thức của miền đó vào weights.
>     -   _Ví dụ:_ BloombergGPT được pre-train thêm trên 363 tỷ token dữ liệu tài chính.
> -   **Supervised Fine-tuning (SFT):** Dạy bằng cặp ví dụ có dán nhãn chuyên ngành (như đã thảo luận ở phần Fine-tuning
>     Mechanism).
> -   **RAG với Knowledge Base chuyên ngành:** Không thay đổi mô hình, chỉ cung cấp tài liệu chuyên ngành qua RAG. Đây
>     là cách nhanh nhất và rẻ nhất.
> -   **Kết hợp:** Continued Pre-training (để mô hình "hiểu" ngôn ngữ miền) → SFT (để mô hình "hành xử" đúng cách) → RAG
>     (để cung cấp dữ liệu cập nhật).
>
> **4. Ví dụ thực tế**
>
> | Miền      | Thách thức                                     | Giải pháp Domain Adaptation                                 |
> | --------- | ---------------------------------------------- | ----------------------------------------------------------- |
> | Y tế      | Viết tắt chuyên ngành, thuật ngữ Latin         | Pre-train trên tài liệu y khoa + SFT trên hồ sơ bệnh án     |
> | Pháp lý   | Ngôn ngữ pháp lý phức tạp, trích dẫn điều luật | SFT trên các bản án + RAG với bộ luật hiện hành             |
> | Tài chính | Chỉ số kỹ thuật, phân tích báo cáo             | Pre-train trên báo cáo tài chính + RAG với dữ liệu realtime |
>
> _Dòng kiến thức vàng:_ Domain Adaptation là quá trình biến "sinh viên tổng quát" thành "chuyên gia ngành" — có thể
> thực hiện bằng Pre-training thêm (đọc nhiều tài liệu), Fine-tuning (học từ ví dụ), hoặc RAG (tra cứu tài liệu). Trong
> thực tế, kết hợp cả ba cho kết quả tốt nhất, nhưng nếu chỉ chọn một thì RAG là điểm khởi đầu nhanh và rẻ nhất.

-   **RLHF:** Học tăng cường từ phản hồi con người (RLHF) đóng vai trò gì trong Fine-tuning?

> **Trả lời:**
>
> **1. RLHF (Reinforcement Learning from Human Feedback) là gì?**
>
> RLHF là kỹ thuật huấn luyện AI sử dụng phản hồi đánh giá của con người làm "tín hiệu thưởng/phạt" để dạy mô hình tạo
> ra câu trả lời mà con người ưa thích hơn. Đây là bước then chốt biến một LLM "biết nhiều nhưng nói lung tung" thành
> một trợ lý "hữu ích, trung thực và vô hại" (helpful, honest, harmless).
>
> **2. Vị trí của RLHF trong quy trình huấn luyện LLM**
>
> ```
> Bước 1: Pre-training (Huấn luyện trước)
>   → Đọc hàng tỷ trang web → Học ngôn ngữ và kiến thức
>   → Kết quả: Mô hình "biết nhiều" nhưng trả lời lung tung, có thể toxic.
>
> Bước 2: Supervised Fine-tuning (SFT)
>   → Học từ cặp ví dụ "câu hỏi → câu trả lời tốt"
>   → Kết quả: Mô hình biết "format" câu trả lời, nhưng chưa biết thế nào là "tốt hơn".
>
> Bước 3: RLHF (Alignment)
>   → Học từ sở thích con người (câu trả lời A tốt hơn B)
>   → Kết quả: Mô hình tạo ra câu trả lời phù hợp nhất với kỳ vọng con người.
> ```
>
> **3. Quy trình RLHF chi tiết**
>
> -   **Bước 3a — Thu thập dữ liệu so sánh:** Cho mô hình tạo 2-4 câu trả lời cho cùng một câu hỏi. Người đánh giá
>     (Human Annotator) xếp hạng: câu trả lời nào tốt hơn.
>
>     -   _Ví dụ:_ "GDP Việt Nam năm 2023 là bao nhiêu?"
>     -   Trả lời A: "GDP Việt Nam năm 2023 đạt khoảng 430 tỷ USD." (ngắn gọn, chính xác)
>     -   Trả lời B: "GDP là tổng sản phẩm quốc nội, được tính bằng..." (dài dòng, thiếu trọng tâm)
>     -   Người đánh giá: A > B.
>
> -   **Bước 3b — Huấn luyện Reward Model (Mô hình thưởng):** Dùng dữ liệu so sánh để huấn luyện một mô hình AI riêng
>     biệt gọi là Reward Model. Mô hình này học cách chấm điểm câu trả lời: cao nếu người đánh giá thích, thấp nếu
>     không.
>
> -   **Bước 3c — Tối ưu hóa bằng RL (Reinforcement Learning):** Sử dụng thuật toán PPO (Proximal Policy Optimization)
>     để cập nhật weights của LLM, tối đa hóa điểm thưởng từ Reward Model. LLM dần "học" cách tạo ra câu trả lời được
>     con người ưa thích.
>
> **4. RLHF dạy AI điều gì?**
>
> -   **Hữu ích (Helpful):** Trả lời trực tiếp, đúng trọng tâm, cung cấp thông tin hữu ích.
> -   **Trung thực (Honest):** Thừa nhận khi không biết, không bịa đặt, đưa ra cảnh báo khi không chắc chắn.
> -   **Vô hại (Harmless):** Từ chối tạo nội dung nguy hiểm, không đưa ra lời khuyên y tế/pháp lý cụ thể, tôn trọng
>     người dùng.
>
> **5. Hạn chế của RLHF**
>
> -   **Sycophancy (Nịnh nọt):** Như đã thảo luận ở Module 2, RLHF vô tình dạy AI "chiều" người dùng vì đồng ý = được
>     thưởng.
> -   **Phụ thuộc vào người đánh giá:** Nếu người đánh giá thiên lệch hoặc không chuyên môn, Reward Model sẽ "học sai" →
>     AI cũng sai.
> -   **Chi phí cao:** Cần thuê hàng trăm người đánh giá, mỗi người đọc và xếp hạng hàng nghìn cặp câu trả lời.
>
> **6. Các biến thể hiện đại**
>
> -   **DPO (Direct Preference Optimization):** Bỏ qua Reward Model, tối ưu trực tiếp từ dữ liệu so sánh. Đơn giản và ổn
>     định hơn RLHF.
> -   **RLAIF (RL from AI Feedback):** Dùng AI mạnh hơn (ví dụ: GPT-4) đánh giá thay con người. Rẻ hơn nhưng chất lượng
>     phụ thuộc vào AI đánh giá.
>
> _Dòng kiến thức vàng:_ RLHF là bước "dạy AI lễ phép" — biến một mô hình "biết nhiều nhưng nói bậy" thành trợ lý "biết
> nhiều và nói hay". Cơ chế: con người đánh giá → xây Reward Model → AI tối ưu để được thưởng nhiều nhất. Mặt trái: AI
> có thể học thói "nịnh" thay vì phản biện trung thực.

-   **Overfitting:** Hiện tượng quá khớp (Overfitting) là gì và tại sao nó làm mất tính linh hoạt của AI?

> **Trả lời:**
>
> **1. Overfitting (Quá khớp) là gì?**
>
> Overfitting là hiện tượng mô hình AI "học thuộc lòng" dữ liệu huấn luyện thay vì "hiểu" quy luật tổng quát. Kết quả:
> mô hình đạt điểm rất cao trên dữ liệu training nhưng kém trên dữ liệu mới chưa từng thấy.
>
> -   _Ẩn dụ:_ Giống như học sinh chỉ học thuộc đáp án 100 bài toán mẫu, khi gặp bài toán thứ 101 (dù cùng dạng nhưng số
>     khác) thì không giải được. Trong khi đó, học sinh "hiểu bản chất" sẽ giải được bất kỳ bài nào cùng dạng.
>
> **2. Dấu hiệu nhận biết Overfitting**
>
> -   **Training Loss rất thấp** nhưng **Validation Loss cao** hoặc tăng dần.
> -   Mô hình trả lời xuất sắc với các câu hỏi giống hệt dữ liệu train, nhưng trả lời kém với câu hỏi mới dù cùng chủ
>     đề.
> -   Mô hình bắt đầu "lặp lại nguyên văn" các đoạn từ dữ liệu train thay vì paraphrase.
>
> **3. Tại sao Overfitting làm mất tính linh hoạt?**
>
> -   **Mất khả năng tổng quát hóa (Generalization):** Mô hình chỉ hoạt động tốt trong phạm vi hẹp của dữ liệu train.
>     Bất kỳ biến thể nào nằm ngoài phạm vi đó → mô hình thất bại.
> -   **Trở nên cứng nhắc:** Thay vì "hiểu" ngôn ngữ và suy luận linh hoạt, mô hình trở thành "máy tra cứu" chỉ biết đối
>     chiếu với dữ liệu đã nhớ.
> -   **Kết hợp với Catastrophic Forgetting:** Overfitting thường xảy ra cùng lúc với việc quên kiến thức tổng quát → mô
>     hình vừa "cứng" vừa "thiếu".
>
> **4. Nguyên nhân gây Overfitting trong Fine-tuning LLM**
>
> -   **Dữ liệu ít, quá ít đa dạng:** 100 ví dụ có format giống nhau → mô hình chỉ học format, không học nội dung.
> -   **Quá nhiều Epoch:** Mô hình "đọc" dữ liệu train quá nhiều lần → bắt đầu học thuộc thay vì tổng quát hóa.
> -   **Learning Rate quá cao:** Weights thay đổi quá mạnh, "khắc sâu" dữ liệu train vào bộ nhớ.
> -   **Mô hình quá lớn so với dữ liệu:** Mô hình 70B tham số chỉ train trên 500 ví dụ → dư sức "nhớ" hết, không cần
>     "hiểu".
>
> **5. Cách phòng chống Overfitting**
>
> -   **Tăng dữ liệu:** Nhiều ví dụ đa dạng hơn giúp mô hình buộc phải "hiểu" thay vì "nhớ".
> -   **Giới hạn Epoch:** Dùng Early Stopping — dừng huấn luyện ngay khi Validation Loss bắt đầu tăng.
> -   **Regularization:** Thêm Dropout (tắt ngẫu nhiên một phần neuron), Weight Decay (phạt weights quá lớn).
> -   **LoRA/PEFT:** Giới hạn số tham số cập nhật → giảm nguy cơ "nhớ" quá nhiều.
> -   **Data Augmentation:** Tạo thêm biến thể của dữ liệu train (paraphrase, thêm nhiễu) để tăng đa dạng.
> -   **Chia tập dữ liệu:** Luôn giữ tập Validation (10-20% dữ liệu) để theo dõi Overfitting trong quá trình train.
>
> _Dòng kiến thức vàng:_ Overfitting biến AI từ "người hiểu bản chất" thành "người học vẹt" — giỏi với bài cũ nhưng bất
> lực với bài mới. Phòng chống bằng: dữ liệu đa dạng + ít epoch + learning rate thấp + LoRA + luôn theo dõi Validation
> Loss. Nguyên tắc then chốt: mô hình tốt là mô hình giỏi với dữ liệu MỚI, không phải dữ liệu CŨ.

