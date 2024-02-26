import Navigation from '../Navigation/Navigation';
import Profile from '../Profile/Profile';
import styles from './header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <a className={styles.header__link} href="#">
          <svg
            width="168"
            height="26"
            viewBox="0 0 168 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 26H12.5461V3.51711H10.5573C6.91314 3.51711 5.00176 5.38766 5.00176 8.15414C5.00176 11.2959 6.3296 12.7548 9.05079 14.6254L11.2956 16.1569L4.81718 25.9939H0L5.81156 17.2042C2.46515 14.7828 0.583544 12.4158 0.583544 8.41444C0.583544 3.40209 4.00736 0 10.5156 0H16.994V25.9939L17 26Z"
              fill="#FC3F1D"
            />
            <path
              d="M29.3026 21H26.4901L31.6108 6.45455H34.8636L39.9915 21H37.179L33.294 9.4375H33.1804L29.3026 21ZM29.3949 15.2969H37.0653V17.4134H29.3949V15.2969ZM48.0721 18.0099L51.3107 10.0909H53.3846L48.9741 21H47.1772L42.8661 10.0909H44.9187L48.0721 18.0099ZM44.2724 10.0909V21H41.7937V10.0909H44.2724ZM51.9783 21V10.0909H54.4357V21H51.9783ZM65.771 6.05682L66.6658 7.71875C66.3486 7.99337 65.9935 8.19223 65.6005 8.31534C65.2075 8.43845 64.7459 8.51894 64.2156 8.55682C63.69 8.58996 63.065 8.61364 62.3406 8.62784C61.5262 8.64678 60.8609 8.80066 60.3448 9.08949C59.8287 9.37831 59.4334 9.81629 59.1587 10.4034C58.8841 10.9858 58.7042 11.7292 58.619 12.6335H58.7397C59.0806 11.9659 59.5588 11.4569 60.1744 11.1065C60.7899 10.7562 61.512 10.581 62.3406 10.581C63.2449 10.581 64.0427 10.7846 64.734 11.1918C65.43 11.5942 65.9722 12.179 66.3604 12.946C66.7534 13.7131 66.9499 14.6411 66.9499 15.7301C66.9499 16.8523 66.7392 17.8253 66.3178 18.6491C65.8964 19.4683 65.2975 20.1004 64.521 20.5455C63.7492 20.9905 62.833 21.2131 61.7724 21.2131C60.7165 21.2131 59.7979 20.9834 59.0167 20.5241C58.2402 20.0601 57.6388 19.3759 57.2127 18.4716C56.7913 17.5625 56.5806 16.4427 56.5806 15.1122V14.1321C56.5806 11.5658 57.0588 9.65057 58.0153 8.38636C58.9717 7.12216 60.3898 6.47822 62.2695 6.45455C62.8282 6.44508 63.3278 6.44271 63.7681 6.44744C64.2132 6.45218 64.6014 6.43087 64.9329 6.38352C65.2643 6.33617 65.5437 6.22727 65.771 6.05682ZM61.7866 19.1534C62.3121 19.1534 62.7667 19.0185 63.1502 18.7486C63.5337 18.474 63.8273 18.0857 64.0309 17.5838C64.2392 17.0819 64.3434 16.4877 64.3434 15.8011C64.3434 15.1241 64.2392 14.5488 64.0309 14.0753C63.8226 13.5971 63.5266 13.2325 63.1431 12.9815C62.7596 12.7306 62.3027 12.6051 61.7724 12.6051C61.3746 12.6051 61.0172 12.6761 60.6999 12.8182C60.3827 12.9602 60.1128 13.1686 59.8903 13.4432C59.6677 13.7178 59.4973 14.0516 59.3789 14.4446C59.2605 14.8376 59.1966 15.2898 59.1871 15.8011C59.1871 16.8286 59.4192 17.6454 59.8832 18.2514C60.3472 18.8527 60.9817 19.1534 61.7866 19.1534ZM72.2766 21.2202C71.5853 21.2202 70.9627 21.0971 70.4087 20.8509C69.8595 20.5999 69.4239 20.2306 69.1019 19.7429C68.7847 19.2552 68.6261 18.6539 68.6261 17.9389C68.6261 17.3234 68.7397 16.8144 68.967 16.4119C69.1942 16.0095 69.5044 15.6875 69.8974 15.446C70.2904 15.2045 70.7331 15.0223 71.2255 14.8991C71.7227 14.7713 72.2364 14.679 72.7667 14.6222C73.4059 14.5559 73.9244 14.4967 74.3221 14.4446C74.7198 14.3878 75.0086 14.3026 75.1886 14.1889C75.3732 14.0705 75.4656 13.8883 75.4656 13.642V13.5994C75.4656 13.0644 75.3069 12.6501 74.9897 12.3565C74.6725 12.063 74.2156 11.9162 73.619 11.9162C72.9892 11.9162 72.4897 12.0535 72.1204 12.3281C71.7558 12.6027 71.5096 12.9271 71.3817 13.3011L68.9812 12.9602C69.1706 12.2973 69.4831 11.7434 69.9187 11.2983C70.3543 10.8485 70.887 10.5123 71.5167 10.2898C72.1464 10.0625 72.8424 9.94886 73.6048 9.94886C74.1303 9.94886 74.6535 10.0104 75.1744 10.1335C75.6952 10.2566 76.171 10.4602 76.6019 10.7443C77.0328 11.0237 77.3784 11.4048 77.6388 11.8878C77.904 12.3707 78.0366 12.9744 78.0366 13.6989V21H75.565V19.5014H75.4798C75.3235 19.8045 75.1033 20.0885 74.8192 20.3537C74.5399 20.6141 74.1871 20.8248 73.761 20.9858C73.3396 21.142 72.8448 21.2202 72.2766 21.2202ZM72.9442 19.331C73.4603 19.331 73.9078 19.2292 74.2866 19.0256C74.6654 18.8172 74.9566 18.5426 75.1602 18.2017C75.3685 17.8608 75.4727 17.4891 75.4727 17.0866V15.8011C75.3922 15.8674 75.2549 15.929 75.0607 15.9858C74.8713 16.0426 74.6583 16.0923 74.4215 16.1349C74.1848 16.1776 73.9504 16.2154 73.7184 16.2486C73.4864 16.2817 73.2852 16.3101 73.1147 16.3338C72.7312 16.3859 72.3879 16.4711 72.0849 16.5895C71.7818 16.7079 71.5427 16.8736 71.3675 17.0866C71.1924 17.295 71.1048 17.5649 71.1048 17.8963C71.1048 18.3698 71.2776 18.7273 71.6232 18.9688C71.9689 19.2102 72.4092 19.331 72.9442 19.331ZM85.3803 21.2131C84.2913 21.2131 83.3562 20.974 82.5749 20.4957C81.7984 20.0175 81.1995 19.357 80.7781 18.5142C80.3614 17.6667 80.1531 16.6913 80.1531 15.5881C80.1531 14.4801 80.3661 13.5024 80.7923 12.6548C81.2184 11.8026 81.8197 11.1397 82.5962 10.6662C83.3775 10.188 84.3008 9.94886 85.3661 9.94886C86.2515 9.94886 87.0352 10.1122 87.717 10.4389C88.4035 10.7609 88.9504 11.2178 89.3576 11.8097C89.7648 12.3968 89.9968 13.0833 90.0536 13.8693H87.5962C87.4968 13.3437 87.2601 12.9058 86.886 12.5554C86.5167 12.2003 86.0219 12.0227 85.4016 12.0227C84.8761 12.0227 84.4144 12.1648 84.0167 12.4489C83.619 12.7282 83.3088 13.1307 83.0863 13.6562C82.8685 14.1818 82.7596 14.8116 82.7596 15.5455C82.7596 16.2888 82.8685 16.928 83.0863 17.4631C83.3041 17.9934 83.6095 18.4029 84.0025 18.6918C84.4002 18.9759 84.8666 19.1179 85.4016 19.1179C85.7804 19.1179 86.119 19.0469 86.4173 18.9048C86.7203 18.758 86.9736 18.5473 87.1772 18.2727C87.3808 17.9981 87.5205 17.6643 87.5962 17.2713H90.0536C89.9921 18.0431 89.7648 18.7273 89.3718 19.3239C88.9788 19.9157 88.4438 20.3797 87.7667 20.7159C87.0896 21.0473 86.2942 21.2131 85.3803 21.2131ZM96.9233 21.2131C95.8343 21.2131 94.8991 20.974 94.1179 20.4957C93.3414 20.0175 92.7424 19.357 92.321 18.5142C91.9044 17.6667 91.696 16.6913 91.696 15.5881C91.696 14.4801 91.9091 13.5024 92.3352 12.6548C92.7614 11.8026 93.3627 11.1397 94.1392 10.6662C94.9205 10.188 95.8438 9.94886 96.9091 9.94886C97.7945 9.94886 98.5781 10.1122 99.2599 10.4389C99.9465 10.7609 100.493 11.2178 100.901 11.8097C101.308 12.3968 101.54 13.0833 101.597 13.8693H99.1392C99.0398 13.3437 98.803 12.9058 98.429 12.5554C98.0597 12.2003 97.5649 12.0227 96.9446 12.0227C96.419 12.0227 95.9574 12.1648 95.5597 12.4489C95.1619 12.7282 94.8518 13.1307 94.6293 13.6562C94.4115 14.1818 94.3026 14.8116 94.3026 15.5455C94.3026 16.2888 94.4115 16.928 94.6293 17.4631C94.8471 17.9934 95.1525 18.4029 95.5455 18.6918C95.9432 18.9759 96.4096 19.1179 96.9446 19.1179C97.3234 19.1179 97.6619 19.0469 97.9602 18.9048C98.2633 18.758 98.5166 18.5473 98.7202 18.2727C98.9238 17.9981 99.0634 17.6643 99.1392 17.2713H101.597C101.535 18.0431 101.308 18.7273 100.915 19.3239C100.522 19.9157 99.9867 20.3797 99.3097 20.7159C98.6326 21.0473 97.8371 21.2131 96.9233 21.2131ZM106.847 21.2202C106.156 21.2202 105.533 21.0971 104.979 20.8509C104.43 20.5999 103.994 20.2306 103.672 19.7429C103.355 19.2552 103.196 18.6539 103.196 17.9389C103.196 17.3234 103.31 16.8144 103.537 16.4119C103.765 16.0095 104.075 15.6875 104.468 15.446C104.861 15.2045 105.303 15.0223 105.796 14.8991C106.293 14.7713 106.807 14.679 107.337 14.6222C107.976 14.5559 108.495 14.4967 108.892 14.4446C109.29 14.3878 109.579 14.3026 109.759 14.1889C109.944 14.0705 110.036 13.8883 110.036 13.642V13.5994C110.036 13.0644 109.877 12.6501 109.56 12.3565C109.243 12.063 108.786 11.9162 108.189 11.9162C107.56 11.9162 107.06 12.0535 106.691 12.3281C106.326 12.6027 106.08 12.9271 105.952 13.3011L103.551 12.9602C103.741 12.2973 104.053 11.7434 104.489 11.2983C104.925 10.8485 105.457 10.5123 106.087 10.2898C106.717 10.0625 107.413 9.94886 108.175 9.94886C108.701 9.94886 109.224 10.0104 109.745 10.1335C110.266 10.2566 110.741 10.4602 111.172 10.7443C111.603 11.0237 111.949 11.4048 112.209 11.8878C112.474 12.3707 112.607 12.9744 112.607 13.6989V21H110.135V19.5014H110.05C109.894 19.8045 109.674 20.0885 109.39 20.3537C109.11 20.6141 108.757 20.8248 108.331 20.9858C107.91 21.142 107.415 21.2202 106.847 21.2202ZM107.515 19.331C108.031 19.331 108.478 19.2292 108.857 19.0256C109.236 18.8172 109.527 18.5426 109.73 18.2017C109.939 17.8608 110.043 17.4891 110.043 17.0866V15.8011C109.962 15.8674 109.825 15.929 109.631 15.9858C109.442 16.0426 109.229 16.0923 108.992 16.1349C108.755 16.1776 108.521 16.2154 108.289 16.2486C108.057 16.2817 107.855 16.3101 107.685 16.3338C107.301 16.3859 106.958 16.4711 106.655 16.5895C106.352 16.7079 106.113 16.8736 105.938 17.0866C105.763 17.295 105.675 17.5649 105.675 17.8963C105.675 18.3698 105.848 18.7273 106.194 18.9688C106.539 19.2102 106.98 19.331 107.515 19.331ZM114.226 24.1676V18.8835H115.093C115.325 18.7036 115.519 18.4598 115.675 18.152C115.831 17.8395 115.959 17.4725 116.059 17.0511C116.163 16.625 116.248 16.1491 116.314 15.6236C116.381 15.0933 116.44 14.5227 116.492 13.9119L116.804 10.0909H124.688V18.8835H126.378V24.1676H123.892V21H116.755V24.1676H114.226ZM117.735 18.8835H122.23V12.1648H119.034L118.864 13.9119C118.769 15.0672 118.644 16.0568 118.488 16.8807C118.331 17.7045 118.08 18.3722 117.735 18.8835ZM133.056 21.2131C131.991 21.2131 131.067 20.9787 130.286 20.5099C129.505 20.0412 128.899 19.3854 128.468 18.5426C128.042 17.6998 127.829 16.715 127.829 15.5881C127.829 14.4612 128.042 13.474 128.468 12.6264C128.899 11.7789 129.505 11.1207 130.286 10.652C131.067 10.1832 131.991 9.94886 133.056 9.94886C134.121 9.94886 135.045 10.1832 135.826 10.652C136.607 11.1207 137.211 11.7789 137.637 12.6264C138.068 13.474 138.283 14.4612 138.283 15.5881C138.283 16.715 138.068 17.6998 137.637 18.5426C137.211 19.3854 136.607 20.0412 135.826 20.5099C135.045 20.9787 134.121 21.2131 133.056 21.2131ZM133.07 19.1534C133.648 19.1534 134.131 18.9948 134.519 18.6776C134.907 18.3556 135.196 17.9247 135.386 17.3849C135.58 16.8452 135.677 16.2438 135.677 15.581C135.677 14.9134 135.58 14.3097 135.386 13.7699C135.196 13.2254 134.907 12.7921 134.519 12.4702C134.131 12.1482 133.648 11.9872 133.07 11.9872C132.478 11.9872 131.986 12.1482 131.593 12.4702C131.205 12.7921 130.914 13.2254 130.719 13.7699C130.53 14.3097 130.435 14.9134 130.435 15.581C130.435 16.2438 130.53 16.8452 130.719 17.3849C130.914 17.9247 131.205 18.3556 131.593 18.6776C131.986 18.9948 132.478 19.1534 133.07 19.1534ZM140.466 25.0909V10.0909H142.994V11.8949H143.143C143.276 11.6297 143.463 11.348 143.704 11.0497C143.946 10.7467 144.272 10.4886 144.684 10.2756C145.096 10.0578 145.622 9.94886 146.261 9.94886C147.104 9.94886 147.864 10.1643 148.541 10.5952C149.223 11.0213 149.762 11.6534 150.16 12.4915C150.563 13.3248 150.764 14.3475 150.764 15.5597C150.764 16.7576 150.567 17.7756 150.174 18.6136C149.781 19.4517 149.246 20.0909 148.569 20.5312C147.892 20.9716 147.125 21.1918 146.268 21.1918C145.643 21.1918 145.125 21.0876 144.713 20.8793C144.301 20.6709 143.969 20.42 143.718 20.1264C143.472 19.8281 143.28 19.5464 143.143 19.2812H143.037V25.0909H140.466ZM142.987 15.5455C142.987 16.2509 143.086 16.8688 143.285 17.3991C143.489 17.9295 143.78 18.3437 144.159 18.642C144.542 18.9356 145.006 19.0824 145.551 19.0824C146.119 19.0824 146.595 18.9309 146.978 18.6278C147.362 18.3201 147.651 17.901 147.845 17.3707C148.044 16.8357 148.143 16.2273 148.143 15.5455C148.143 14.8684 148.046 14.267 147.852 13.7415C147.658 13.2159 147.369 12.804 146.985 12.5057C146.602 12.2074 146.124 12.0582 145.551 12.0582C145.002 12.0582 144.535 12.2027 144.152 12.4915C143.768 12.7803 143.477 13.1851 143.278 13.706C143.084 14.2268 142.987 14.84 142.987 15.5455ZM154.706 13.642H157.923C159.315 13.642 160.392 13.9806 161.154 14.6577C161.917 15.3348 162.3 16.2225 162.305 17.321C162.3 18.036 162.125 18.6705 161.779 19.2244C161.439 19.7784 160.941 20.214 160.288 20.5312C159.639 20.8438 158.851 21 157.923 21H152.966V10.0909H155.444V18.8906H157.923C158.482 18.8906 158.941 18.7486 159.301 18.4645C159.661 18.1757 159.841 17.8063 159.841 17.3565C159.841 16.883 159.661 16.4972 159.301 16.1989C158.941 15.9006 158.482 15.7514 157.923 15.7514H154.706V13.642ZM163.662 21V10.0909H166.233V21H163.662Z"
              fill="black"
              fill-opacity="0.85"
            />
          </svg>
        </a>
        <Navigation />
        <Profile />
      </div>
    </header>
  );
}
