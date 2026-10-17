# Vì sao lá đổi màu mùa thu? — Sơ đồ logic

```mermaid
flowchart TD
    A["🍂 Ngày ngắn lại + đêm lạnh<br/><small>photoperiod — tín hiệu chính</small>"] --> B["Diệp lục tố (chlorophyll)<br/>ngừng tái tạo"]
    B --> C["Diệp lục tố phân huỷ<br/>→ mất dần màu xanh"]
    C --> D{"Sắc tố còn lại<br/>bị 'lộ diện'"}
    D --> E["Carotenoid<br/>🟡🟠 vàng-cam<br/><small>vẫn có sẵn cả mùa hè</small>"]
    D --> F["Anthocyanin<br/>🔴🟣 đỏ-tím<br/><small>mới tổng hợp vào thu</small>"]

    C --> G["Tầng rụng (abscission layer)<br/>hình thành ở cuống lá"]
    G --> H["Chặn nước & giữ đường<br/>trong lá"]
    H --> F
    G --> I["Tannin<br/>🟤 nâu<br/><small>chất thải cuối cùng</small>"]

    E --> J["Lá rụng<br/>theo trọng lượng"]
    F --> J
    I --> J

    K["☀️ Ấm + nắng ngày<br/>🌙 đêm mát"] -.-> F
    L["🌧️ Thu ấm-ẩm"] -.-> I

    classDef trigger fill:#e8ded0,stroke:#b8a888,color:#3a3228;
    classDef green fill:#d7e6d9,stroke:#8fae95,color:#2f3a38;
    classDef warm fill:#f0dcc0,stroke:#dcae58,color:#5a4a2a;
    classDef red fill:#f0d2d4,stroke:#d98f96,color:#6a2f34;
    classDef brown fill:#e3d5c4,stroke:#a98f6f,color:#4a3a28;
    classDef weather fill:#e6e4f0,stroke:#6f7fae,color:#33375a;

    class A trigger;
    class B,C green;
    class E warm;
    class F red;
    class G,H brown;
    class I,J brown;
    class K,L weather;
```

## Chuỗi nhân–quả (một câu)

> Đêm dài ra → cây ngưng tái tạo diệp lục tố → diệp lục tố tan dần để lộ carotenoid (vàng/cam) và
> kích hoạt tổng hợp anthocyanin (đỏ/tím, nhờ đường bị tầng rụng giữ lại) → tannin nâu xuất hiện cuối cùng →
> lá rụng theo trọng lượng.

## Nguồn

- Kew Gardens (RBG Kew) — *Why do leaves change colour in autumn?*
- Royal Society of Chemistry (RSC Education) — *The chemistry behind leaves changing colour*
- University of Missouri IPM — *The Science of Fall Leaf Color*
- PMC / Plant Physiology — *Why Leaves Turn Red in Autumn: the Role of Anthocyanins*
- American Journal of Botany (Primka & Smith, 2019) — synchrony in fall leaf drop
