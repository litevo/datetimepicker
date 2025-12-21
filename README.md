# DateTimePicker (Vanilla JS) — Gregorian, Persian, Islamic

پلاگین مستقل و ماژولار برای انتخاب تاریخ و زمان با پشتیبانی از تقویم‌های گرگوری، جلالی (شمسی) و هجری (اسلامی). امکان نمایش در یک تقویم و ذخیره‌سازی در تقویم دیگری (مثلاً نمایش شمسی و ذخیره میلادی) فراهم است. چندزبانه‌گی moment.js و ایونت‌های کاربردی نیز پشتیبانی می‌شود.

---

## نصب

- کپی ساختار پروژه در محیط خود (یا نصب به عنوان ماژول داخلی).
- اضافه کردن وابستگی‌ها در `index.html`:
  - `moment.js`
  - `moment-jalali.js`
  - `moment-hijri.js`
  - locale‌های مورد نیاز moment (مثل `fa`, `ar`)
- سپس اسکریپت‌های پلاگین را اضافه کنید:
  - `src/utils/Formatter.js`
  - `src/adapters/CalendarAdapter.js`
  - `src/core/EventHandler.js`
  - `src/DateTimePicker.js`
- فایل استایل `styles/datetimepicker.css` را لینک کنید.

> اگر محیط شما آفلاین است، فایل‌های وابستگی را به صورت محلی در پروژه قرار دهید.

---

## استفاده سریع

```html
<input id="mydate" type="text" data-dtp="true" data-target-hidden="#mydate_g"/>
<input id="mydate_g" type="hidden" name="mydate_g"/>

<script>
  // تعیین زبان
  moment.locale('fa');

  // اتصال به همه‌ی فیلدهایی که data-dtp="true" دارند
  DateTimePicker.attachAll('input[data-dtp="true"]', {
    calendar: 'persian',
    storageCalendar: 'gregorian',
    displayFormat: 'jYYYY/jMM/jDD HH:mm',
    storageFormat: 'YYYY-MM-DD HH:mm',
    locale: 'fa',
    enableTime: true,
    minDate: '2000-01-01 00:00',
    maxDate: '2050-12-31 23:59',
    events: {
      onChange: ({ display, storage }) => {
        console.log('Display:', display, 'Storage:', storage);
      }
    }
  });
</script>
```

---

## گزینه‌ها

- **calendar:** `'gregorian' | 'persian' | 'islamic'` — تقویم نمایش.
- **storageCalendar:** همان تقویم برای ذخیره در input hidden.
- **displayFormat:** فرمت نمایش (مثال: `jYYYY/jMM/jDD HH:mm` برای شمسی).
- **storageFormat:** فرمت ذخیره‌سازی (مثال: `YYYY-MM-DD HH:mm` برای میلادی).
- **locale:** زبان moment (مثل `fa`, `en`, `ar`).
- **minDate / maxDate:** محدودیت انتخاب. توصیه می‌شود با `storageFormat` تنظیم شوند.
- **enableTime:** فعال‌سازی انتخاب ساعت/دقیقه.
- **hourStep / minuteStep:** گام‌های انتخاب ساعت و دقیقه.
- **events:** آبجکت شامل `onSelect`, `onChange`, `onOpen`, `onClose`.

---

## ایونت‌ها

- **onOpen:** هنگام باز شدن پاپ‌آپ.
- **onClose:** هنگام بسته شدن پاپ‌آپ.
- **onSelect:** هنگام انتخاب روز از گرید (قبل از OK).
- **onChange:** پس از تایید (OK) و اعمال به ورودی و hidden.

هر ایونت payload معنادار دریافت می‌کند؛ مثلاً `onChange` شامل `display`, `storage`, `input`.

---

## پشتیبانی چند فیلد

با `DateTimePicker.attachAll('input[data-dtp="true"]', options)` هر ورودی که این داده را داشته باشد فعال می‌شود. برای ذخیره به hidden، روی ورودی اصلی `data-target-hidden="#hiddenId"` بگذارید. مقدار hidden به تقویم `storageCalendar` و فرمت `storageFormat` نوشته می‌شود.

---

## افزودن تقویم جدید (مثلاً Academic Calendar)

1. **تعریف آداپتر جدید** در `src/adapters/CalendarAdapter.js` مشابه آداپترهای موجود:
   - **name:** نام تقویم (مثل `'academic'`).
   - **now():** تولید زمان فعلی در این تقویم.
   - **startOfMonth(m), endOfMonth(m), addMonth(m, count):** محدوده‌ها و جابه‌جایی ماه.
   - **getMonthYearLabel(m):** نمایش عنوان ماه/سال.
   - **format(m, formatStr), parse(str, formatStr):** فرمت و پارس.

2. **اتصال به سوییچ get(name)**:
   ```javascript
   case 'academic':
     return AcademicAdapter;
   ```

3. در صورت نیاز، قوانین اختصاصی (مثلاً شروع ترم، هفته‌های کلاسی) را با moment یا محاسبات خودتان پیاده‌سازی کنید. اگر تقویم شما افزونه‌ی مخصوص ندارد، می‌توانید از تاریخ گرگوری به عنوان منبع و قواعدی برای تقسیم‌بندی آکادمیک (هفته‌های ترم، تعطیلات) در گرید اعمال کنید.

4. **تست در index.html** با تنظیم:
   ```javascript
   DateTimePicker.attachAll('input[data-dtp="true"]', {
     calendar: 'academic',
     storageCalendar: 'gregorian',
     // ...
   });
   ```

---

## اسکرین‌شات

- لطفاً پس از اجرا در مرورگر، یک اسکرین‌شات از پاپ‌آپ DateTimePicker در کنار فرم تهیه کنید و در مستندات پروژه خودتان اضافه نمایید.

---

## نکات نگهداری و توسعه

- **Defensive coding:** در کد بررسی‌های لازم انجام شده و خطاها در کنسول لاگ می‌شوند.
- **بدون فریم‌ورک‌های سنگین:** پلاگین با Vanilla JS پیاده‌سازی شده است.
- **سفارشی‌سازی استایل:** کلاس‌های `.dtp-*` را مطابق سلیقه تغییر دهید.
- **Locale ها:** برای زبان‌های مختلف، فایل‌های locale مربوط به moment را بارگذاری کنید.
- **Edge cases:** برای min/max از فرمت ذخیره‌سازی استاندارد استفاده کنید تا در تبدیل بین تقویم‌ها دچار ابهام نشوید.

```

---

## یادداشت‌های فنی و نکات کلیدی

- **همگام‌سازی نمایش و ذخیره‌سازی:** با دو آداپتر جداگانه انجام می‌شود؛ انتخاب کاربر با تقویم نمایش (مثلاً شمسی) انجام شده و سپس مختصات تاریخ به تقویم ذخیره‌سازی (مثلاً میلادی) منتقل می‌گردد و در hidden نوشته می‌شود.
- **چندزبانه‌گی:** با `moment.locale('fa')` یا زبان‌های دیگر برای سرتیتر روزهای هفته و ماه‌ها.
- **محدودیت‌ها:** min/max بر اساس مقادیر میلادی با `storageFormat` توصیه می‌شود تا تداخل تقویمی پیش نیاید.
- **سازگاری چند فیلد:** `attachAll` نمونه‌ها را برای همه‌ی ورودی‌ها می‌سازد؛ هر ورودی می‌تواند hidden مختص خود داشته باشد.
- **دیباگ:** تمامی بخش‌ها در صورت بروز خطا به کنسول لاگ می‌دهند تا در محیط‌های واقعی بتوان سریعاً مشکل را ردیابی کرد.

اگر دوست داری، می‌تونم همین حالا یک نسخه فشرده آماده‌زیپ از این ساختار رو هم برایت بچینم یا با نیازهای خاص فرم‌هایت در یزد تطبیقش بدهم.