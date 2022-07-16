import { HeartFilled } from "@ant-design/icons";
import img from "@/assets/temp/image/index/a.png";
import img1 from "@/assets/temp/image/index/b.png";
import img2 from "@/assets/temp/image/index/c.png";
import img3 from "@/assets/temp/image/index/d.png";
import img4 from "@/assets/temp/image/index/e.png";
import img5 from "@/assets/temp/image/index/f.png";
import img6 from "@/assets/temp/image/index/g.png";
import img7 from "@/assets/temp/image/index/h.png";
import img8 from "@/assets/temp/image/index/i.png";

const imgs = [img, img3, img5, img6, img4, img7, img8, img2, img1];

export default function Bazaar() {
  return (
    <div className="columns-5 gap-x-2-3 mt-6" style={{ columnFill: "auto" }}>
      {imgs.map((item, index) => (
        <div key={index} className="mb-5 relative inline-block mt-1">
          <img src={item} style={{ objectFit: "cover" }} />
          <div className="font-bold text-base">收一份情书模板</div>
          <div className="text-xs text-gray-400">2022/5/12 12:00截止 </div>
          <div className="text-xs text-gray-400">文本/文案</div>
          <div className="text-main text-base">悬赏： 20元</div>
          <div className="absolute right-0 bottom-0 bg-main w-10 h-10 rounded-full flex items-center justify-center text-white">
            <HeartFilled />
          </div>
        </div>
      ))}
    </div>
  );
}
