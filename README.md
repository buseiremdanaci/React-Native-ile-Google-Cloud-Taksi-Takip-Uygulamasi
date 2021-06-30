# React-Native-ile-Google-Cloud-Taksi-Takip-Uygulamasi
Bulut bilişim ve google map api kullanarak android platformunda bir uygulama gelistirilmiştir.

Bu mobil uygulamada bulut ortamında tutulan veriler ,yine bulut ortamında bulunan Bigquery veri ambarı üzerinde tablo halinde tutulmaktadır.

Bigquery üzerinde bulunan bu tablolar üzerinde bizden istenilen SQL sorguları çalıştırılır.Bu çalışan sorgular Google Cloud arka planda idleriyle beraber job olarak tutulur.Ilgili sorgular uygulama üzerinde çalışma prensibi  Bigquery API'si üzerinde istek yollarken çalıştırılması istediğimiz sorguya ait olan job id verilerek API isteği gönderilir.İstek sonucu JSON formatta okuyarak ilgili parse işlemleri yapılır ve istenilen verilere erişilir.

3.Sorguda istenilen veriler aynı şekilde Bigquery API'si kullanılarak elde edilir.Elde edilen şehir isimlerini google Direction API isteğiyle beraber yollayarak verilen 2 şehrin koordinatları döner.Böylece Google Maps üzerinde 2 şehir gösterilir ve  yol cizdirilir.
        


![Screenshot_1619506273](https://user-images.githubusercontent.com/80635038/123966641-459f1800-d9be-11eb-8f94-72497751d41e.png)
![Screenshot_1619506282](https://user-images.githubusercontent.com/80635038/123966646-4637ae80-d9be-11eb-9cea-87bb0c3de769.png)
![Screenshot_1619506289](https://user-images.githubusercontent.com/80635038/123966648-4637ae80-d9be-11eb-9c99-71664360a6a8.png)
![Screenshot_1619506297](https://user-images.githubusercontent.com/80635038/123966650-46d04500-d9be-11eb-9f83-944f118b9302.png)
![Screenshot_1619506315](https://user-images.githubusercontent.com/80635038/123966651-46d04500-d9be-11eb-8ca5-59ee6248012e.png)
![Screenshot_1619506322](https://user-images.githubusercontent.com/80635038/123966654-4768db80-d9be-11eb-8797-96d1ebd30574.png)
![Screenshot_1619506328](https://user-images.githubusercontent.com/80635038/123966655-4768db80-d9be-11eb-86ad-27cf17f764eb.png)
![Screenshot_1619506336](https://user-images.githubusercontent.com/80635038/123966657-4768db80-d9be-11eb-83dc-c1e7340f1cbe.png)
![Screenshot_1619506342](https://user-images.githubusercontent.com/80635038/123966659-48017200-d9be-11eb-9dc1-01ca8705c7d1.png)
