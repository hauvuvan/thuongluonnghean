const shopUnderMaintenance=false;
const groups=[['cao-cap','Răng sứ cao cấp','rang-su-cao-cap'],['kim-loai','Răng sứ kim loại','rang-su-kim-loai'],['toan-su','Dòng toàn sứ','dong-toan-su']];
const items=[
['ht-smile','HT Smile','cao-cap'],
['lava','Lava','cao-cap'],
['nacera','Nacera','cao-cap'],
['cercon','Cercon','cao-cap'],
['ceramill','Ceramill','cao-cap'],
['katana','Katana','cao-cap'],
['venus','Venus','cao-cap'],
['zirconia','Zirconia','cao-cap'],
['kim-loai-thuong','Kim loại thường','kim-loai'],
['titanium','Titanium','kim-loai'],
['chrome-cobalt','Chrome Cobalt','kim-loai'],
['full-kim-loai','Full kim loại','kim-loai'],
['emax','Emax','toan-su'],
['cao-cap-lava','Cao cấp Lava','toan-su'],
['cercon-ht','Cercon HT','toan-su'],
['su-zirconia','Sứ Zirconia','toan-su'],

].map(([id,name,group])=>({id,name,group,path:id==='chrome-cobalt'?'/su-chrome-cobalt/':id==='full-kim-loai'?'/full-kim-loai/':id==='su-zirconia'?'/su-zirconia/':'/rang-su-'+id+'/'}));
const productDetails={
  "ht-smile": {
    "intro": "HT Smile là dòng răng toàn sứ được trang tham khảo giới thiệu với vật liệu phôi sứ và quy trình thiết kế CAD/CAM.",
    "sections": [
      [
        "Thiết kế và màu sắc",
        "Kỹ thuật viên dựng hình răng trên máy tính, sau đó hoàn thiện hình dáng và màu theo yêu cầu của nha khoa. Độ trong và màu sứ là những điểm được chú trọng trong phần giới thiệu HT Smile."
      ],
      [
        "Khi lựa chọn HT Smile",
        "Bạn nên trao đổi với nha khoa về màu răng, vị trí phục hình và tên vật liệu sẽ ghi trên thẻ."
      ]
    ]
  },
  "lava": {
    "intro": "Lava là nhóm vật liệu phục hình của 3M. Trang tham khảo giới thiệu các dòng Lava Plus, Lava Ultimate và Lava Esthetic.",
    "sections": [
      [
        "Các dòng Lava",
        "Lava Plus và Lava Esthetic được giới thiệu trong nhóm zirconia. Lava Ultimate là vật liệu gốm nhựa nano. Mỗi dòng có đặc tính và chỉ định riêng."
      ],
      [
        "Xác nhận đúng phiên bản",
        "Khi làm răng, hãy hỏi nha khoa tên phiên bản Lava được sử dụng và lưu lại thông tin đó cùng thẻ bảo hành."
      ]
    ]
  },
  "nacera": {
    "intro": "Nacera được giới thiệu là dòng răng toàn sứ sử dụng vật liệu zirconia, chú trọng màu sắc và độ trong của phục hình.",
    "sections": [
      [
        "Cấu tạo và hoàn thiện",
        "Trang tham khảo mô tả phần sườn zirconia và các bước hoàn thiện bề mặt để tạo màu và độ bóng. Hình dáng, sắc độ được điều chỉnh cho từng ca."
      ],
      [
        "Thông tin khi bàn giao",
        "Nha khoa sẽ kiểm tra khớp cắn và hướng dẫn chăm sóc. Bạn có thể đối chiếu tên Nacera trên thẻ với giấy tờ được bàn giao."
      ]
    ]
  },
  "cercon": {
    "intro": "Cercon là dòng phục hình toàn sứ. Trang tham khảo phân biệt Cercon Zirconia và Cercon HT.",
    "sections": [
      [
        "Cercon Zirconia và Cercon HT",
        "Hai phiên bản được giới thiệu với khác biệt về độ trong và khả năng thể hiện màu. Cercon HT được mô tả là lựa chọn chú trọng tính thẩm mỹ."
      ],
      [
        "Thiết kế phục hình",
        "Quy trình CAD/CAM hỗ trợ thiết kế răng theo mẫu của từng khách hàng. Nha khoa sẽ xác định phiên bản phù hợp và ghi rõ trong hồ sơ."
      ]
    ]
  },
  "ceramill": {
    "intro": "Ceramill Zolid thuộc hệ thống vật liệu và chế tác của Amann Girrbach. Trang tham khảo giới thiệu dòng này với nền zirconia và quy trình CAD/CAM.",
    "sections": [
      [
        "Vật liệu và quy trình",
        "Mẫu răng được số hóa để thiết kế hình dáng, sau đó gia công và hoàn thiện màu sứ. Độ khít và hình thể được kiểm tra trước khi bàn giao."
      ],
      [
        "Trao đổi với nha khoa",
        "Bạn có thể hỏi tên phiên bản Ceramill Zolid, màu răng và điều kiện bảo hành của ca phục hình."
      ]
    ]
  },
  "katana": {
    "intro": "Katana là dòng răng toàn sứ được trang tham khảo giới thiệu có nguồn gốc Nhật Bản và sử dụng phôi zirconia.",
    "sections": [
      [
        "Màu sắc phục hình",
        "Phần giới thiệu Katana tập trung vào màu sắc và hình dáng tự nhiên. Nha khoa và kỹ thuật viên cùng lựa chọn sắc độ theo răng còn lại và mong muốn của khách hàng."
      ],
      [
        "Nhận thẻ bảo hành",
        "Kiểm tra tên Katana, mã thẻ, tên nha khoa và thời hạn bảo hành khi nhận răng."
      ]
    ]
  },
  "venus": {
    "intro": "Venus được trang tham khảo giới thiệu là dòng răng toàn sứ, với phần sườn và lớp phủ bằng sứ.",
    "sections": [
      [
        "Chế tác bằng CAD/CAM",
        "Công nghệ thiết kế và gia công trên máy tính hỗ trợ tạo hình phục hình. Kỹ thuật viên hoàn thiện màu sắc và bề mặt trước khi bàn giao cho nha khoa."
      ],
      [
        "Chọn màu và hình dáng",
        "Bạn nên trao đổi với nha khoa về sắc độ và dáng răng mong muốn, đồng thời kiểm tra thông tin bảo hành sau khi hoàn tất."
      ]
    ]
  },
  "zirconia": {
    "intro": "Zirconia là vật liệu được sử dụng trong phục hình răng toàn sứ. Trang tham khảo có mục giới thiệu riêng cho dòng này.",
    "sections": [
      [
        "Thông tin vật liệu",
        "Tên Zirconia có thể xuất hiện trên thẻ cùng thông tin dòng vật liệu cụ thể. Bạn có thể hỏi nha khoa để biết tên phôi và loại phục hình đã sử dụng."
      ],
      [
        "Thời hạn bảo hành",
        "Thời hạn của thẻ Five-T được tra cứu theo mã hoặc số điện thoại đã đăng ký. Ngày hết hạn hiển thị theo hồ sơ của từng khách hàng."
      ]
    ]
  }
};
const articles=[
{slug:'huong-dan-tra-cuu-bao-hanh',title:'Tra cứu thẻ bảo hành trong vài bước',tag:'Hướng dẫn',intro:'Dùng mã thẻ hoặc số điện thoại để xem răng sứ còn bảo hành đến ngày nào.',sections:[['Tìm thông tin trên thẻ','Tìm mã in trên thẻ nha khoa đã đưa cho bạn. Bạn có thể chụp lại thẻ để lần sau dễ tìm.'],['Nhập mã hoặc số điện thoại','Mở trang tra cứu bảo hành, nhập đầy đủ mã thẻ hoặc số điện thoại đã đăng ký. Kiểm tra ký tự và tránh nhầm chữ O với số 0.'],['Đối chiếu kết quả','Kiểm tra tên sản phẩm, nha khoa thực hiện, số lượng răng và ngày bắt đầu, ngày hết hạn. Số điện thoại được che một phần để bảo vệ thông tin.'],['Khi không có kết quả','Kiểm tra lại mã hoặc thử số điện thoại đã đăng ký. Nếu vẫn chưa thấy thẻ, hãy nhờ nha khoa kiểm tra.']]},
{slug:'thong-tin-can-giu-sau-phuc-hinh',title:'Những thông tin nên giữ cùng thẻ bảo hành',tag:'Hồ sơ',intro:'Giữ thẻ cùng giấy tờ nha khoa để dễ tìm khi cần hỏi về bảo hành.',sections:[['Thẻ và hồ sơ bàn giao','Lưu mã thẻ, tên dòng sản phẩm, ngày bàn giao và tên nha khoa thực hiện. Có thể chụp ảnh tài liệu và lưu ở nơi riêng tư.'],['Thời gian và phạm vi bảo hành','Hỏi nha khoa những trường hợp được bảo hành và giấy tờ cần mang theo. Bạn có thể xem ngày hết hạn trên trang tra cứu.'],['Thông tin liên hệ','Lưu số điện thoại của nha khoa và lịch hẹn, nếu có. Nếu cần chia sẻ ảnh thẻ, hãy che thông tin cá nhân trước.']]},
{slug:'doi-chieu-ten-dong-rang-su',title:'Đối chiếu đúng tên dòng răng sứ',tag:'Sản phẩm',intro:'Bạn có thể xem tên dòng răng sứ trên thẻ hoặc giấy tờ nha khoa đã đưa cho bạn.',sections:[['Xem tên trên hồ sơ','So tên răng sứ trên thẻ với tên ghi trên giấy tờ nha khoa đã đưa.'],['Hỏi rõ thông tin còn thiếu','Nếu tên trên thẻ khác với tên bạn được tư vấn, hãy nhờ nha khoa xác nhận lại tên dòng và điều kiện bảo hành.'],['Nếu cần sửa thông tin','Nhờ nha khoa cập nhật thông tin, rồi tra cứu lại để kiểm tra.']]}
];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function art(name,i=0){return '<div class="product-art tone-'+i%3+'" role="img" aria-label="Minh họa dòng '+esc(name)+'"><svg viewBox="0 0 240 170" aria-hidden="true"><ellipse cx="120" cy="143" rx="60" ry="9" fill="#123c5910"/><path d="M76 37C96 22 108 38 120 38S151 21 167 38C190 63 157 132 146 132C132 132 142 91 120 91S110 132 96 132C83 132 51 62 76 37Z" fill="white" stroke="#b2d5e3" stroke-width="2"/><path d="M84 43Q99 33 108 43" fill="none" stroke="#dcebf0" stroke-width="6" stroke-linecap="round"/><circle cx="177" cy="109" r="24" fill="#0c6999"/><path d="m166 109 7 7 15-17" fill="none" stroke="white" stroke-width="3"/></svg><span>'+esc(name)+'</span></div>'}
function productPicture(product,className='card-photo'){
 const imageId=product.id;
 return '<img class="'+className+'" src="/product-images/'+imageId+'.webp" alt="Răng sứ '+esc(product.name)+'" width="600" loading="lazy" decoding="async">';
}
function cards(list){
 return '<div class="cards">'+list.map(product=>
  '<article class="product" data-name="'+esc(product.name.toLowerCase())+'"><a href="'+product.path+'">'+productPicture(product)+'</a></article>'
 ).join('')+'</div>';
}
function homeGallery([id,label,slug]){
 const photos=items.filter(product=>product.group===id).map(product=>
  '<a href="'+product.path+'"><img src="/product-images/'+product.id+'.webp" alt="'+esc(product.name)+'" loading="lazy" decoding="async"></a>'
 ).join('');
 return '<section class="wrap home-gallery"><h2>'+label+'</h2><div class="home-photos">'+photos+'</div><a class="home-gallery-link" href="/'+slug+'/" aria-label="Xem tất cả '+label.toLowerCase()+'">Xem tất cả</a></section>';
}
const nav=[['/','Trang chủ'],['/ve-chung-toi/','Về chúng tôi'],['/shop/','Sản phẩm'],['/tra-cuu-the-bao-hanh/','Tra cứu bảo hành'],['/lien-he/','Liên hệ']];
export function renderHeader(path){return '<header class="site-header"><style> body>.site-header{background:#103650;color:#fff;border-bottom:1px solid #dfe9ed;font-family:"Be Vietnam Pro",Arial,sans-serif} .site-header .wrap{max-width:1200px;padding-inline:28px;margin:auto} .site-header .brandrow{display:flex;align-items:center;justify-content:space-between;padding-block:25px;gap:16px} .site-header .company-brand{display:flex;align-items:center;gap:8px;line-height:1.25} .site-header .company-logo{width:80px;height:80px;object-fit:contain} .site-header .brand b{display:block;color:#fff;font-size:27px;letter-spacing:0} .site-header .brand small{display:block;color:#fff;font-size:8px;letter-spacing:2px;margin-top:1px} .site-header .outline{display:inline-flex;align-items:center;justify-content:center;border:1px solid #fff;border-radius:5px;padding:10px 21px;min-height:48px;color:#fff;background:#103650;font-size:17px;font-weight:700;white-space:nowrap} .site-header .header-navigation{background:#103650} .site-header nav{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap} .site-header nav a{display:block;padding:16px 8px;border-bottom:3px solid transparent;color:#fff;font-size:17px;font-weight:700;line-height:1.6;text-transform:uppercase} .site-header nav a[aria-current]{border-color:#fff} .site-header a:hover{background:#1c4c6b;color:#fff} .site-header .mobilemenu{display:none} .site-header a:focus-visible,.site-header summary:focus-visible{outline:3px solid #fff;outline-offset:2px} @media(max-width:760px){ .site-header nav{display:none} .site-header .brandrow{padding-block:18px;flex-wrap:wrap} .site-header .company-logo{width:52px;height:52px} .site-header .brand b{font-size:20px} .site-header .outline{font-size:16px} .site-header .mobilemenu{display:block} .site-header summary{font-size:16px;padding:12px 0;cursor:pointer} .site-header summary span{float:right} .site-header .mobilemenu a{display:block;color:#fff;font-size:16px;font-weight:700;padding:12px 0;border-top:1px solid #ffffff40;text-transform:uppercase} } </style><div class="wrap brandrow"><a class="brand company-brand" href="/" aria-label="FIVE-T Dental Lab · Trang chủ"><img class="company-logo" src="/brand/five-t.png" alt="" width="80" height="80"><span><b>FIVE-T Dental Lab</b><small>BẢO HÀNH ĐIỆN TỬ</small></span></a><a class="outline" href="/tra-cuu-the-bao-hanh/">Tra cứu thẻ ↗</a></div><div class="header-navigation"><nav class="wrap" aria-label="Điều hướng chính">'+nav.map(([url,label])=>'<a '+(url===path?'aria-current="page"':'')+' href="'+url+'">'+label+'</a>').join('')+'</nav><details class="mobilemenu wrap"><summary>Danh mục <span>☰</span></summary><div>'+nav.map(([url,label])=>'<a href="'+url+'">'+label+'</a>').join('')+'</div></details></div></header>'}
function layout(title,content,path){return '<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+esc(title)+' · FIVE-T Dental Lab</title><meta name="description" content="'+esc(title)+' — danh mục sản phẩm và hệ thống bảo hành điện tử FIVE-T Dental Lab."><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet"><style>'+css+(path==='/'?homeGalleryCss:'')+'</style></head><body><a class="skip" href="#main">Đến nội dung chính</a>'+renderHeader(path)+'<main id="main">'+content+'</main><footer><div class="wrap footgrid"><div><a class="brand" href="/"><b>FIVE-T Dental Lab</b></a><a href="/admin">Đăng nhập quản trị →</a></div><div><h3>Xem thêm</h3>'+nav.slice(1).map(([u,l])=>'<a href="'+u+'">'+l+'</a>').join('')+'</div><div><h3>Nhóm sản phẩm</h3>'+groups.map(g=>'<a href="/'+g[2]+'/">'+g[1]+'</a>').join('')+'<a href="/shop/">Tất cả sản phẩm</a><a href="/product-category/rang-su-zirconia/">Zirconia</a>'+'</div><div><h3>Cần hỗ trợ?</h3><p>Bạn có thể hỏi nha khoa nơi làm răng về thẻ và điều kiện bảo hành.</p><a href="/lien-he/">Hướng dẫn liên hệ →</a></div></div><div class="wrap copyright">© 2026 FIVE-T Dental Lab</div></footer>'+script+'</body></html>'}
function heading(kicker,title,intro){return '<section class="pagehead"><div class="wrap">'+(kicker?'<div class="eyebrow">'+kicker+'</div>':'')+'<h1>'+title+'</h1><p>'+intro+'</p></div></section>'}
function cta(){return '<section class="wrap cta"><div><h2>Bạn đã có thẻ bảo hành?</h2><p>Dùng mã thẻ hoặc số điện thoại đã đăng ký để xem thời hạn bảo hành.</p></div><a class="button" href="/tra-cuu-the-bao-hanh/">Tra cứu ngay →</a></section>'}
function articleCards(){return '<div class="cards">'+articles.map(a=>'<article class="editorial"><small>'+a.tag+'</small><h3><a href="/tu-van/'+a.slug+'/">'+a.title+'</a></h3><p>'+a.intro+'</p><a class="more" href="/tu-van/'+a.slug+'/">Đọc hướng dẫn →</a></article>').join('')+'</div>'}
export function renderPage(input){let path=input.split('?')[0];if(!path.endsWith('/'))path+='/';let title,body;
if(path==='/'){title='Trang chủ';body='<section class="homehero"><div class="wrap herogrid"><div><h1>TRA CỨU THÔNG TIN BẢO HÀNH RĂNG SỨ</h1><p>Bạn muốn biết răng sứ còn bảo hành đến ngày nào? Nhập mã trên thẻ hoặc số điện thoại đã đăng ký bên dưới.</p></div><div class="hero-logo"><img src="/brand/five-t.png" alt="Logo FIVE-T Dental Lab" width="800" height="800" fetchpriority="high" decoding="async"></div></div></section><section class="wrap quick"><div><h2>TRA CỨU THỜI HẠN BẢO HÀNH</h2></div><form action="/tra-cuu-the-bao-hanh/"><label for="quick-query">Mã thẻ / Số điện thoại</label><div class="searchline"><input id="quick-query" name="query" required maxlength="80" placeholder="Nhập mã thẻ hoặc số điện thoại"><button class="button">Tra cứu →</button></div></form></section>'+groups.slice(0,2).map(homeGallery).join('');}
else if(path==='/ve-chung-toi/'){
 title='Về chúng tôi';
 body=`<article class="wrap section reading">
 <h1>Giới thiệu labo răng sứ FIVE-T Dental Lab</h1>
 <p>Chúng tôi chế tác răng sứ cho các nha khoa. Từ thiết kế đến hoàn thiện, đội ngũ FIVE-T chú trọng khớp cắn, màu sắc và hình dáng của từng chiếc răng.</p>
 <section>
  <h2>Công nghệ chế tác răng sứ</h2>
  <ul>
   <li><strong>Quét mẫu 3D và thiết kế CAD/CAM</strong> giúp kỹ thuật viên dựng hình và kiểm tra độ khít trước khi chế tác.</li>
   <li><strong>Lò nung sứ chân không</strong> hỗ trợ hoàn thiện màu sắc tự nhiên của răng sứ.</li>
   <li><strong>Vật liệu sứ như Zirconia</strong> được lựa chọn theo yêu cầu của từng ca.</li>
  </ul>
 </section>
 <section>
  <h2>Đội ngũ kỹ thuật viên</h2>
  <p>Đội ngũ có kinh nghiệm chế tác răng sứ và chăm chút từng chi tiết để răng có dáng tự nhiên, hài hòa với khuôn mặt và phù hợp với khớp cắn của từng khách hàng.</p>
 </section>
 <section>
  <h2>Cam kết chất lượng</h2>
  <ul>
   <li>Kiểm tra độ khít, màu sắc và hình dáng trước khi bàn giao.</li>
   <li>Phối hợp với nha khoa để hoàn thiện theo tiến độ đã hẹn.</li>
   <li>Hỗ trợ sau bàn giao theo thời hạn và điều kiện ghi trên thẻ bảo hành.</li>
  </ul>
 </section>
 <section>
  <h2>Thông tin liên hệ</h2>
  <p>Nếu cần hỏi về sản phẩm hoặc bảo hành, bạn có thể liên hệ nha khoa nơi làm răng.</p>
  <a class="more" href="/lien-he/">Cách liên hệ nha khoa →</a>
 </section>
 </article>`+cta();
}
else if(shopUnderMaintenance&&(path==='/shop/'||path==='/shop/page/2/')){
 title='Sản phẩm';
 body='<section class="pagehead"><div class="wrap"><h1>Sản phẩm</h1><h2>Đang bảo trì</h2><p>Bạn vẫn có thể tra cứu bảo hành trong thời gian này.</p><div class="actions"><a class="button" href="/tra-cuu-the-bao-hanh/">Tra cứu bảo hành</a><a class="outline" href="/">Về trang chủ</a></div></div></section>';
}
else if(path==='/shop/'||path==='/shop/page/2/'||groups.some(g=>path==='/'+g[2]+'/')||path.startsWith('/product-category/')){let group=groups.find(g=>path==='/'+g[2]+'/');let brand;if(path.startsWith('/product-category/')){if(!/^\/product-category\/[^/]+\/$/.test(path))return null;const id=path.split('/')[2].replace(/^rang-su-/,'');brand=items.find(p=>p.id===id);if(!brand&&!['dd-bio','kerox'].includes(id))return null;if(!brand)brand={name:id==='dd-bio'?'DD-Bio':'Kerox',empty:true};}title=brand?'Răng sứ '+brand.name:group?group[1]:'Tất cả sản phẩm';const list=brand?(brand.empty?[]:[brand]):group?items.filter(p=>p.group===group[0]):path==='/shop/page/2/'?items.slice(12):items.slice(0,12);body=heading('',title,'Tìm theo tên răng sứ ghi trên thẻ bảo hành hoặc giấy tờ nha khoa đã đưa cho bạn.')+'<section class="wrap section catalog"><div class="catalogtools"><div class="chips"><a '+(!group&&!brand?'aria-current="page"':'')+' href="/shop/">Tất cả</a>'+groups.map(g=>'<a '+(group?.[0]===g[0]?'aria-current="page"':'')+' href="/'+g[2]+'/">'+g[1]+'</a>').join('')+'</div><div><label for="catalog-search">Tìm tên sản phẩm</label><input id="catalog-search" type="search" placeholder="Ví dụ: Katana" autocomplete="off"></div></div><p id="catalog-count" class="muted" aria-live="polite">'+list.length+' sản phẩm</p>'+cards(list)+(path==='/shop/'||path==='/shop/page/2/'?'<nav class="pagination" aria-label="Trang sản phẩm"><a href="/shop/">Trang 1</a><a href="/shop/page/2/">Trang 2</a></nav>':'')+(brand?.empty?'<p>Chưa có sản phẩm nào trong nhóm này.</p>':'')+'<p id="catalog-empty" hidden>Không tìm thấy sản phẩm. Bạn thử kiểm tra lại tên nhé.</p></section>'+cta();}
else if(['/rang-su-cao-cap-lava/','/rang-su-cercon-ht/','/rang-su-emax/'].includes(path)){
 title='Đang bảo trì';
 body='<section class="wrap section"><h1>Đang bảo trì</h1></section>';
}
else if(items.some(product=>product.path===path)){
 const product=items.find(product=>product.path===path);
 const group=groups.find(group=>group[0]===product.group);
 const detail=productDetails[product.id];
 title='Răng sứ '+product.name;
 const picture=productPicture(product,'detail-photo');
 body='<div class="wrap breadcrumb"><a href="/">Trang chủ</a> / <a href="/'+group[2]+'/">'+group[1]+'</a> / '+esc(product.name)+'</div>'
  +'<section class="wrap section productdetail">'+picture+'<div><div class="eyebrow">'+group[1]+'</div><h1>'+title+'</h1>'
  +(detail?'<p class="lead">'+esc(detail.intro)+'</p>':'<div class="infobox"><h2>Khi nhận thẻ, bạn nên kiểm tra</h2><ul><li>Tên dòng răng sứ trên thẻ.</li><li>Tên nha khoa và mã thẻ.</li><li>Ngày bắt đầu và ngày hết hạn bảo hành.</li></ul></div>')
  +'<div class="actions"><a class="button" href="/tra-cuu-the-bao-hanh/">Tra cứu bảo hành</a><a class="outline" href="/lien-he/">Liên hệ nha khoa</a></div></div></section>'
  +(detail?'<article class="wrap section reading"><h2>Thông tin sản phẩm</h2>'+detail.sections.map(([heading,text])=>'<section><h3>'+esc(heading)+'</h3><p>'+esc(text)+'</p></section>').join('')
   +'<p class="footnote">Thông tin giới thiệu tham khảo từ <a href="https://baohanhzirconia.com'+product.path+'">trang '+esc(product.name)+'</a>. Tên vật liệu và điều kiện bảo hành được nha khoa xác nhận khi bàn giao.</p></article>':'')
  +'<section class="wrap section"><div class="sectiontitle"><h2>Cùng nhóm sản phẩm</h2><a href="/'+group[2]+'/">Xem cả nhóm</a></div>'+cards(items.filter(item=>item.group===product.group&&item.id!==product.id).slice(0,3))+'</section>';
}
else if(path==='/chuyen-muc/tu-van-kien-thuc/'){title='Hướng dẫn bảo hành';body=heading('','Hướng dẫn bảo hành','Cách tra cứu, giữ lại thông tin trên thẻ và xử lý khi thông tin chưa đúng.')+'<section class="wrap section">'+articleCards()+'</section>'+cta();}
else if(articles.some(a=>path==='/tu-van/'+a.slug+'/')){const a=articles.find(a=>path==='/tu-van/'+a.slug+'/');title=a.title;body=heading(a.tag,a.title,a.intro)+'<article class="wrap section reading">'+a.sections.map(([h,p])=>'<section><h2>'+h+'</h2><p>'+p+'</p></section>').join('')+'<a class="more" href="/chuyen-muc/tu-van-kien-thuc/">← Tất cả hướng dẫn</a></article>'+cta();}
else if(path==='/lien-he/'){
 title='Liên hệ';
 body=heading('','Liên hệ bảo hành','Nếu cần bảo hành hoặc thấy thông tin trên thẻ chưa đúng, hãy liên hệ nha khoa nơi bạn làm răng.')
  +'<section class="wrap section split"><div><h2>Trước khi gọi cho nha khoa</h2><p>Chuẩn bị mã thẻ, tên răng sứ và thông tin bạn muốn hỏi. Bạn có thể dùng số điện thoại ghi trên giấy tờ nha khoa đã đưa cho bạn.</p></div><aside class="infobox"><h2>Không tìm thấy thẻ?</h2><p>Thử nhập lại mã thẻ hoặc dùng số điện thoại đã đăng ký. Nếu vẫn không thấy, hãy nhờ nha khoa kiểm tra.</p><a class="button" href="/tra-cuu-the-bao-hanh/">Tra cứu bảo hành</a></aside></section>';
}
else return null;return layout(title,body,path);}
const script='<script>const quick=document.getElementById("quick-query");if(quick){quick.form.addEventListener("submit",event=>{event.preventDefault();try{sessionStorage.setItem("zirconia-lookup",quick.value.trim());location.href="/tra-cuu-the-bao-hanh/"}catch{location.href="/tra-cuu-the-bao-hanh/"}})}const search=document.getElementById("catalog-search");if(search){search.addEventListener("input",()=>{const query=search.value.trim().toLocaleLowerCase("vi");let count=0;document.querySelectorAll(".product").forEach(card=>{const show=card.dataset.name.includes(query);card.hidden=!show;if(show)count++});document.getElementById("catalog-count").textContent=count+" sản phẩm";document.getElementById("catalog-empty").hidden=count>0})}</script>';
const css=`.catalog .cards{grid-template-columns:repeat(4,minmax(0,1fr))}@media(max-width:760px){.catalog .cards{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:380px){.catalog .cards{grid-template-columns:1fr}}.card-photo{display:block;width:100%;aspect-ratio:4/3;object-fit:cover;background:#fff}.detail-photo{display:block;width:100%;height:auto;max-height:520px;object-fit:contain;background:#fff;border-radius:12px}.reading .footnote{font-size:14px}.company-brand{display:flex;align-items:center;gap:8px;line-height:1.25}.company-brand b{letter-spacing:0}.company-logo{display:block;width:clamp(52px,10vw,80px);height:auto}.pagehead .actions{margin-top:20px}.mobilemenu{display:none}.mobilemenu summary{cursor:pointer;min-height:48px;padding:10px 0;font-size:13px;font-weight:bold}.mobilemenu summary span{float:right}.mobilemenu a{display:block;padding:12px 0;border-top:1px solid #dfe9ed;font-size:13px}:root{--navy:#103650;--blue:#075f95;--cyan:#13aab8;--ink:#18384c;--muted:#647987;--line:#dfe9ed;--bg:#f5f9fb}*{box-sizing:border-box}body{margin:0;font:16px/1.75 Arial,Helvetica,sans-serif;color:var(--ink);background:white}a{color:inherit;text-decoration:none}a:hover{color:var(--blue)}button,input{font:inherit}a:focus-visible,button:focus-visible,input:focus-visible{outline:3px solid var(--cyan);outline-offset:4px}.wrap{max-width:1200px;padding:0 28px;margin:auto}.top{background:var(--navy);color:#dcebf2;font-size:10px;letter-spacing:1px;padding:9px 0}.top .wrap{display:flex;justify-content:space-between}.brandrow{display:flex;align-items:center;justify-content:space-between;padding-top:25px;padding-bottom:25px}.brand b{font-size:27px;letter-spacing:3px;color:var(--navy)}.brand small{display:block;font-size:8px;letter-spacing:2px;margin-top:1px;color:var(--muted)}header{border-bottom:1px solid var(--line);background:#fff}nav{display:flex;justify-content:space-between;gap:20px}nav a{padding:16px 0;font-size:12px;font-weight:bold;border-bottom:3px solid transparent}nav a[aria-current]{color:var(--blue);border-color:var(--cyan)}.skip{position:absolute;top:-100px;background:white;padding:12px;z-index:10}.skip:focus{top:0}.button,.outline{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:10px 21px;border-radius:5px;font-weight:bold;font-size:13px;border:1px solid var(--blue)}.button{background:var(--blue);color:#fff;cursor:pointer}.button:hover{background:var(--navy);color:white}.outline{background:#fff;color:var(--blue);border-color:#cbdfe8}.eyebrow{text-transform:uppercase;font-size:10px;letter-spacing:2px;font-weight:bold;color:var(--blue)}h1,h2,h3{color:var(--navy);line-height:1.25}h1{font-size:43px;letter-spacing:-1px;margin:16px 0 22px}h2{font-size:29px;letter-spacing:-.5px}h3{font-size:20px}p{color:var(--muted)}.homehero{background:#dbeafe;overflow:hidden}.herogrid{display:grid;grid-template-columns:1.15fr 1fr;align-items:center;min-height:460px;gap:75px}.homehero h1{font-size:58px;line-height:1.15;margin:20px 0}.homehero em{font-style:normal;color:var(--blue)}.homehero p{max-width:490px}.actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:26px}.heroart{position:relative}.heroart .product-art{height:310px;border-radius:50% 50% 12px 12px;background:#dceef3}.heroart svg{height:270px}.heroart .product-art span{font-size:12px;letter-spacing:4px}.seal{position:absolute;right:-12px;bottom:-20px;box-shadow:0 8px 30px #10365012;background:white;border:1px solid var(--line);border-radius:9px;padding:15px 23px;font-size:14px;font-weight:bold}.seal small{font-weight:normal;font-size:10px;color:var(--muted)}.quick{display:grid;grid-template-columns:1fr 1.2fr;gap:35px;align-items:center;margin-top:28px;border:1px solid var(--line);border-radius:9px;padding:24px 28px;box-shadow:0 8px 22px #10365006}.quick h2{font-size:clamp(24px,3vw,30px);margin:0}.quick p{font-size:12px;margin:8px 0 0}.searchline{display:flex;gap:10px}label{display:block;font-weight:bold;font-size:11px;margin-bottom:7px}input{width:100%;min-width:0;border:1px solid #ccdde5;border-radius:5px;min-height:48px;padding:10px 13px;font-size:16px;color:var(--ink);background:white}.searchline button{white-space:nowrap}.section{padding-top:55px;padding-bottom:20px}.sectiontitle{display:flex;align-items:center;justify-content:space-between;gap:20px;margin-bottom:25px}.sectiontitle h2{margin:8px 0}.sectiontitle>a{font-size:12px;color:var(--blue);font-weight:bold}.groupgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}.groupcard{padding:26px;border:1px solid var(--line);border-radius:8px;background:var(--bg)}.groupcard>span{font:13px monospace;color:var(--cyan)}.groupcard h3{margin:17px 0 12px}.groupcard p{font-size:13px;margin-bottom:20px}.groupcard b{font-size:12px;color:var(--blue)}.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:23px}.product{border:1px solid var(--line);border-radius:9px;overflow:hidden;background:white;transition:transform .2s,box-shadow .2s}.product:hover{transform:translateY(-4px);box-shadow:0 12px 24px #10365010}.product a{display:block;height:100%}.product-art{height:195px;background:#edf6f8;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden}.product-art svg{height:155px;max-width:100%}.product-art span{font-size:11px;font-weight:bold;letter-spacing:1.6px;color:var(--blue);padding-bottom:12px}.tone-1{background:#edf2f9}.tone-2{background:#eef6f3}.card-body{padding:22px}.card-body small,.editorial>small{color:var(--blue);font-size:10px}.card-body h3{margin:8px 0 12px}.card-body p{font-size:12px;line-height:1.8;margin-bottom:20px}.more{font-size:12px;color:var(--blue);font-weight:bold}.cta{background:#ecf5f8;border:1px solid var(--line);border-radius:10px;display:flex;align-items:center;justify-content:space-between;gap:25px;padding:30px;margin-top:55px;margin-bottom:65px}.cta h2{margin:10px 0}.cta p{font-size:13px;margin-bottom:0}.editorial{padding:28px;background:var(--bg);border-radius:8px;border:1px solid var(--line)}.editorial p{font-size:13px}.editorial h3{margin:12px 0}.article-number{font:32px monospace;color:#b3c9d3;margin-bottom:22px}.pagehead{background:#edf5f8;padding:48px 0}.pagehead p{max-width:760px;margin-bottom:0}.pagehead h1{margin-bottom:15px}.split{display:grid;grid-template-columns:1.1fr 1fr;gap:65px;align-items:start}.split>.product-art{height:330px}.split>.product-art svg{height:240px}.split p{font-size:14px}.catalogtools{display:flex;align-items:center;justify-content:space-between;gap:25px}.catalogtools>div:last-child{min-width:220px}.chips{display:flex;flex-wrap:wrap;gap:8px}.chips a{padding:10px 14px;border:1px solid var(--line);border-radius:30px;font-size:12px;min-height:44px}.chips a[aria-current]{background:var(--blue);border-color:var(--blue);color:white}.muted{font-size:12px;color:var(--muted)}[hidden]{display:none!important}.breadcrumb{padding-top:24px;font-size:11px;color:var(--muted)}.breadcrumb a{color:var(--blue)}.productdetail{display:grid;grid-template-columns:1fr 1fr;gap:55px;padding-top:30px}.productdetail>.product-art{height:420px;border-radius:12px}.productdetail>.product-art svg{height:300px}.productdetail>.product-art span{font-size:16px}.productdetail h1{margin-top:12px}.lead{font-size:15px}.infobox{background:var(--bg);border:1px solid var(--line);border-radius:8px;padding:24px}.infobox h2{font-size:20px;margin:0 0 15px}.infobox li{font-size:13px;color:var(--muted);margin:7px 0}.infobox ul{padding-left:18px;margin-bottom:0}.reading{max-width:850px;padding-bottom:35px}.reading p{font-size:15px}.reading h2{font-size:24px;margin-top:30px}.reading section{margin-bottom:30px}.contactsteps{padding-left:24px}.contactsteps li{padding-left:10px;margin-bottom:24px}.contactsteps p{margin-top:7px}.infobox hr{border:0;border-top:1px solid var(--line);margin:25px 0}.infobox h3{font-size:17px}footer{background:var(--navy);color:#d6e4ec;margin-top:60px;padding-top:45px}footer .brand b{color:white;font-size:20px}footer h3{color:white;font-size:13px;margin:0 0 18px}footer a{font-size:12px}footer a:hover{color:white}footer p{font-size:12px;color:#b3c8d5}.footgrid{display:grid;grid-template-columns:1.2fr 1fr 1fr 1.2fr;gap:38px}.footgrid>div>a:not(.brand){display:block;margin-bottom:9px}.copyright{font-size:10px;color:#afc3d0;border-top:1px solid #ffffff18;padding-top:20px;padding-bottom:20px;margin-top:35px}@media(min-width:1000px){.homehero~.section .cards{grid-template-columns:repeat(4,1fr)}}@media(max-width:900px){.herogrid{gap:30px}.homehero h1{font-size:44px}.cards{grid-template-columns:repeat(2,1fr)}nav{gap:14px;flex-wrap:wrap;justify-content:flex-start}.split{gap:30px}.footgrid{grid-template-columns:1fr 1fr}.catalogtools{align-items:stretch;flex-direction:column}.quick{grid-template-columns:1fr}.productdetail{gap:30px}}@media(max-width:600px){header>nav{display:none}.mobilemenu{display:block}.wrap{padding-left:20px;padding-right:20px}.top span{display:none}.brandrow{padding-top:18px;padding-bottom:18px}.brand b{font-size:20px}.brand small{font-size:6px}.brandrow .outline{padding:8px 12px;font-size:11px;min-height:42px}nav{gap:0;display:grid;grid-template-columns:repeat(3,1fr)}nav a{font-size:10px;padding:12px 4px;text-align:center}.herogrid{grid-template-columns:1fr;gap:25px;padding-top:35px;padding-bottom:40px}.homehero h1{font-size:42px}.homehero p{font-size:14px}.heroart{max-width:310px;width:100%;margin:auto}.heroart .product-art{height:220px}.heroart svg{height:180px}.seal{right:0;padding:10px 14px}.quick{border-radius:0;margin-top:0;padding-top:25px;padding-bottom:25px;gap:18px}.searchline{flex-direction:column}.section{padding-top:35px}.sectiontitle{align-items:flex-start;margin-bottom:20px}.sectiontitle h2{font-size:23px}.sectiontitle>a{font-size:10px;white-space:nowrap;padding-top:12px}.groupgrid,.split,.productdetail{grid-template-columns:1fr;gap:18px}.groupcard{padding:22px}.groupcard h3{font-size:18px}.cards{gap:13px}.card-body{padding:16px}.card-body h3{font-size:18px}.card-body p{font-size:11px}.product-art{height:150px}.product-art svg{height:115px}.product-art span{font-size:9px}.pagehead{padding:30px 0}.pagehead h1{font-size:32px}.pagehead p{font-size:14px}.cta{border-radius:0;flex-direction:column;align-items:flex-start;margin-top:35px;margin-bottom:35px;padding-top:25px;padding-bottom:25px}.cta h2{font-size:24px}.productdetail>.product-art{height:280px}.productdetail>.product-art svg{height:220px}.productdetail h1{font-size:36px}.editorial{padding:22px}.editorial h3{font-size:18px}.editorial p{font-size:12px}.editorial .article-number{font-size:25px}.footgrid{gap:25px}.footgrid>div:last-child{grid-column:1/-1}.footgrid .brand b{font-size:17px}.reading h2{font-size:22px}}@media(max-width:380px){.cards{grid-template-columns:1fr}.homehero h1{font-size:37px}.actions{flex-direction:column}.brand b{font-size:18px}.brand small{letter-spacing:1px}.eyebrow{font-size:9px;letter-spacing:1.4px}}@media(prefers-reduced-motion:reduce){.product{transition:none}.product:hover{transform:none}}
/* Vietnamese typography: comfortable sizes and room for diacritics. */
body{font-family:"Be Vietnam Pro",system-ui,-apple-system,"Segoe UI",sans-serif;font-size:16px;line-height:1.75;-webkit-font-smoothing:antialiased}
button,input,select,textarea{font-family:inherit;line-height:1.5}
h1,h2,h3{line-height:1.4;letter-spacing:-.025em;text-wrap:balance;overflow-wrap:break-word}
p,li,dd{overflow-wrap:break-word}
.nav a,nav a{font-size:15px;line-height:1.6;font-weight:600}
.nav{gap:12px 22px}.nav a{padding:14px 0}
.brand strong,.brand b{letter-spacing:.025em;line-height:1.4}
.brand small{font-size:11px;letter-spacing:.12em;line-height:1.6}
.intro,.homehero p,.pagehead p,.split p,.reading p,.lead{font-size:17px;line-height:1.85}
.btn,.button,.outline,.edit,.textbutton{font-size:15px;line-height:1.6;min-height:48px}
label,.sectionhead p,.helper,.step p,.tiny,.badge,.details dt,.notice,.demo,.footnote,.stat,th,td,td small,.empty{font-size:14px;line-height:1.7}
.step h3{font-size:16px}.sectionhead h2{font-size:24px}.details dd{font-size:16px;line-height:1.7}
.verified,.eyebrow,.top,.topline,.breadcrumb,.muted,.copyright{font-size:13px;line-height:1.7;letter-spacing:.04em}
.card-body small,.editorial>small,.product-art span,.more,.groupcard b,.chips a,.sectiontitle>a,.home-gallery-link{font-size:14px;line-height:1.7}
.card-body p,.editorial p,.groupcard p,.cta p,.infobox li,.quick p,footer a,footer p{font-size:16px;line-height:1.8}
footer h3{font-size:17px}.field,input,select,textarea{font-size:16px}.formgrid .field{height:50px}
.mobilemenu summary,.mobilemenu a{font-size:16px;line-height:1.7}.mobilemenu summary{list-style-position:inside}
.brandrow{gap:16px}.brandrow .outline{flex-shrink:0}.brand{min-width:0}
.cardbrand small,.cardbottom,.floatingseal small{font-size:12px;line-height:1.6;letter-spacing:.03em}.cardtitle{font-size:13px;line-height:1.6}.floatingseal{font-size:14px}
@media(max-width:760px){
 .nav{width:100%;gap:4px 20px;justify-content:flex-start}.nav a{font-size:14px;padding:10px 0}.nav a:first-child{display:block}
 .header{height:auto;flex-wrap:wrap;padding-top:12px;padding-bottom:12px}.brand strong,.brand b{font-size:21px}.brand small{display:block;font-size:10px}
 .intro,.homehero p,.pagehead p,.split p,.reading p{font-size:16px}.sectionhead h2{font-size:21px}.resulthead h3{font-size:18px}
 .stat{font-size:14px}.sectiontitle{flex-wrap:wrap;gap:8px}.sectiontitle>a{padding-top:0;white-space:normal}
 .brandrow{flex-wrap:wrap}.brandrow .outline{font-size:14px;min-height:46px}.cards{grid-template-columns:1fr}.card-body h3,.editorial h3{font-size:21px}
 .homehero h1{font-size:clamp(32px,8vw,44px)}h1{letter-spacing:-.025em}.footgrid{grid-template-columns:1fr}.footgrid>div:last-child{grid-column:auto}
 .cardart{width:260px}.cardtitle{font-size:13px}.cardcode{font-size:16px}.helper{line-height:1.8}
}

/* Card inspired by the supplied FIVE-T steel porcelain warranty card. */
.sample-card{position:relative;isolation:isolate;width:100%;max-width:480px;margin:auto;padding:24px;border:1px solid #c4d1ac;border-radius:22px;background:radial-gradient(ellipse at 75% 80%,#fffdf2 0 24%,transparent 25%),linear-gradient(125deg,#f9f7eb,#e9efd6 55%,#d8e4b9);box-shadow:0 18px 40px #163b5020;color:#203e45;text-align:left;overflow:hidden;font-family:"Be Vietnam Pro",sans-serif}
.sample-card:before{content:"";position:absolute;z-index:-1;width:85%;height:80%;border:18px solid #ffffff70;border-radius:50%;right:-15%;bottom:-30%;transform:rotate(-25deg)}
.sample-card-top{display:flex;justify-content:space-between;gap:16px;align-items:flex-start;margin-bottom:25px}.sample-lab{display:flex;align-items:center;gap:7px;color:#086896;font-size:20px;font-weight:800;line-height:1.15}.sample-lab img{object-fit:contain;width:48px;height:48px}.sample-lab small{display:block;font-size:10px;letter-spacing:.04em;margin-top:4px}.sample-title{text-align:right;font-size:19px;font-weight:600;color:#b94e35;line-height:1.5}.sample-title small{display:block;font-size:13px;font-weight:500;color:#086896}.sample-title b{display:block;font-size:22px;color:#086896;letter-spacing:.06em;margin-top:4px}.sample-card-fields{display:grid;gap:13px}.sample-card-fields>div{display:flex;align-items:baseline;gap:14px;font-size:14px;font-weight:600}.sample-card-fields i{flex:1;min-width:20px;border-bottom:1px solid #8e9e85}.sample-card-bottom{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:26px;font-size:13px}.sample-card-bottom>span{font-size:10px;letter-spacing:.08em;color:#65745f}.sample-card-bottom strong{font-weight:600}.cardart:has(.sample-card){width:100%;max-width:480px;transform:none;display:block}.heroart:has(.sample-card){width:100%;max-width:480px}
@media(max-width:760px){.sample-card{padding:20px;border-radius:17px}.sample-card-top{gap:10px;margin-bottom:20px}.sample-lab{font-size:18px}.sample-lab img{width:38px;height:38px}.sample-title{font-size:16px}.sample-title b{font-size:20px}.sample-card-fields>div{font-size:14px}.sample-card-bottom{flex-wrap:wrap}.cardart:has(.sample-card){margin:16px auto 0}.heroart:has(.sample-card){max-width:420px}}
@media(max-width:360px){.sample-card{padding:16px}.sample-lab{font-size:16px}.sample-lab img{display:none}.sample-title{font-size:15px}}

body>header{background:#103650}
header{--navigation-blue:#103650}
header .brand b,header .brand small{color:#fff}
header .header-navigation a{text-transform:uppercase}
.header-navigation,header .brandrow .outline{background:var(--navigation-blue)}
header .header-navigation a,header .header-navigation summary,header .brandrow .outline{
 color:#fff;font-size:17px;font-weight:700;
}
header .brandrow .outline{border-color:#fff}
header .header-navigation a[aria-current="page"]{border-color:#fff}
header .header-navigation a:hover,header .brandrow .outline:hover{background:#1c4c6b}
header .header-navigation :focus-visible,header .brandrow .outline:focus-visible{outline-color:#fff}
@media(min-width:761px){
 header .header-navigation nav{gap:12px;flex-wrap:wrap}
 header .header-navigation nav a{padding-inline:8px}
}
@media(max-width:760px){
 header .header-navigation a,header .header-navigation summary,header .brandrow .outline{font-size:16px}
}

.homehero .herogrid{
 grid-template-columns:minmax(0,1.2fr) minmax(0,1fr);
 gap:clamp(28px,5vw,64px);
 min-height:0;
 padding-block:clamp(28px,4vw,52px);
}
.homehero h1{color:#000;font-size:clamp(32px,4.3vw,52px);margin:0 0 18px}
.homehero p{color:#000;margin:0}
.hero-logo{
 width:100%;max-width:420px;margin:0 auto;border-radius:20px;
 overflow:hidden;background:#fff;box-shadow:0 16px 36px #10365012;
}
.hero-logo img{display:block;width:100%;height:auto}
@media(max-width:760px){
 .homehero .herogrid{grid-template-columns:minmax(0,1fr);gap:24px}
 .homehero h1{font-size:clamp(28px,5.5vw,38px);margin-bottom:12px}
 .hero-logo{max-width:300px}
}

body{background:#fff;color:#000}
main,main .homehero,main .pagehead,main .quick,main .cta,main .infobox{background:#fff}
main h1,main h2,main h3,main p,main li,main label,main .eyebrow,main .muted,main .lead,main .more,main .breadcrumb,main .editorial small,main .card-body small{color:#000}
footer{background:#103650;color:#fff}
footer h3,footer p,footer a,footer .brand b,footer .copyright{color:#fff}
`;
const homeGalleryCss=`
.home-gallery{padding:24px 0;text-align:center}
.home-gallery h2{margin:0 0 16px;color:#000;font-size:clamp(19px,2.5vw,27px);line-height:1.25;text-transform:uppercase}
.home-photos{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:20px}
.home-photos a{display:block;padding:8px;border:1px dashed #bd6a6a;border-radius:9px;background:#fff}
.home-photos img{display:block;width:100%;aspect-ratio:4/3;object-fit:cover}
.home-gallery-link{display:inline-flex;align-items:center;min-height:44px;margin-top:18px;padding:0 18px;border-radius:7px;background:#ae2527;color:white;font-weight:700;font-size:13px;text-transform:uppercase}
.home-gallery-link:hover{background:#8e1b1d;color:white}
@media(max-width:650px){.home-photos{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.home-photos a{padding:5px}}
`;

export const publicRoutes=["/","/ve-chung-toi/","/shop/","/shop/page/2/","/lien-he/","/chuyen-muc/tu-van-kien-thuc/",...groups.map(g=>"/"+g[2]+"/"),...items.map(p=>p.path),...articles.map(a=>"/tu-van/"+a.slug+"/"),...["katana","nacera","cercon","ceramill","emax","venus","dd-bio","zirconia","kerox"].map(id=>"/product-category/rang-su-"+id+"/")];
