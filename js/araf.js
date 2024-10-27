function surahAyatContent() {
  // جلب البيانات من API العربي
  let arabicReq = new XMLHttpRequest();
  let englishReq = new XMLHttpRequest();
  
  // نقاط النهاية الخاصة بكل لغة
  let arabicUrl = "http://api.alquran.cloud/v1/surah/3";  // للغة العربية
  let englishUrl = "http://api.alquran.cloud/v1/surah/3/en.asad";  // للغة الإنجليزية

  // إعداد طلبات الاستجابة
  arabicReq.responseType = 'json';
  englishReq.responseType = 'json';

  arabicReq.open('GET', arabicUrl);
  englishReq.open('GET', englishUrl);

  // إرسال الطلبات
  arabicReq.send();
  englishReq.send();

  arabicReq.onload = function() {
    if (arabicReq.status == 200 && arabicReq.status < 300) {
      let arabicSurah = arabicReq.response;
      let arabicAyat = arabicSurah.data.ayahs;

      // انتظر حتى يتم تحميل الترجمة الإنجليزية أيضًا
      englishReq.onload = function() {
        if (englishReq.status == 200 && englishReq.status < 300) {
          let englishSurah = englishReq.response;
          let englishAyat = englishSurah.data.ayahs;

          // تأكد من تطابق عدد الآيات في كلا الاستجابتين
          if (arabicAyat.length === englishAyat.length) {
            // تفريغ المحتوى قبل إضافة المحتوى الجديد
            document.getElementById("con").innerHTML = "";

            // التكرار على كل آية وعرض النص العربي والترجمة الإنجليزية
            for (let i = 0; i < arabicAyat.length; i++) {
              let card = `
                <div class="card">
                  <div class="top">
                    <span class="ayah">${arabicAyat[i].text}</span>
                  </div>
                  <div class="bottom">
                    <div class="text-con">
                      <span style="display: block;" class="saheh-title">Saheh international</span>
                      <span class="translation">${englishAyat[i].text}</span>
                    </div>
                  </div>
                </div>
              `;
              document.getElementById("con").innerHTML += card;
            }
            
            // تحديث اسم السورة في القسم العلوي
            document.getElementById("st").innerHTML = arabicSurah.data.name;
          } else {
            alert("عدد الآيات بين العربية والإنجليزية غير متطابق!");
          }
        } else {
          alert("حدث خطأ في جلب الترجمة الإنجليزية");
        }
      };
    } else {
      alert("حدث خطأ في جلب النص العربي");
    }
  };
}

// استدعاء الوظيفة لتحميل البيانات
surahAyatContent();

