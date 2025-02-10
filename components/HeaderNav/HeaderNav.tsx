'use client';

import {
  ActionIcon,
  Avatar,
  Burger,
  Flex,
  Group,
  Indicator,
  MantineTheme,
  Menu,
  rem,
  Stack,
  Text,
  TextInput,
  Tooltip,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import {
  IconBell,
  IconCircleHalf2,
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftExpand,
  IconMessageCircle,
  IconMoonStars,
  IconPower,
  IconSearch,
  IconSunHigh,
} from '@tabler/icons-react';
import { LanguagePicker } from '@/components';
import { upperFirst, useMediaQuery } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';

const ICON_SIZE = 20;

const MESSAGES = [
  {
    id: '687725a3-5489-486e-9ffd-180df00f8e10',
    first_name: 'Egor',
    last_name: 'Thornebarrow',
    message:
      'Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue.',
  },
  {
    id: '75103d7a-b26b-4e1f-8d7e-2117867d05b8',
    first_name: 'Magdalen',
    last_name: 'Slessor',
    message:
      'In eleifend quam a odio. In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.',
  },
  {
    id: '08bff541-e731-445f-a2e1-7f08e3e30357',
    first_name: 'Bald',
    last_name: 'Vant',
    message:
      'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque.',
  },
];

const NOTIFICATIONS = [
  {
    id: '15f6a5e0-758f-4642-aa95-a07bb3170544',
    title: 'Beahan-Senger',
    message:
      'Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla.',
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAK/SURBVDjLbZNNaFRXFMd/72U+dDLNRItGUSeJiagTJ6IQhdhaWoopFCJiF10UBAXpSlHcddHi0oUbkXYRFURE/NiIIjSkpCpdtGoTJG20iUMsMZJokhmqee/de8/p4jmDggcuFw73/s7/nPu/nqrSe/hch6peUZhD6VYUVUCVeNPaEmcwYbn06/nv1gIkiA8cVNhQLOS96ZkyqtVLEMMEFZgvv2IhVEQTrbyJGAA7i4U13qeda8ivLKIxAVGJq0pcfVljhsyiBDt2f8s7AFstyleFDuauXVvjLm516gIAFJVoYqKMl95TRBGvB1vWsBLpBKs29RMe9NSnANVQURxTnEiWFEWAsPlq4PvAyjOCRPTFVJ+kiAIMGGElThvqSORTFFID3Oy+xfqdnUyfLZHvWByX3UGiBOsM4RhyJ5t7bH8WB2qyp27fWxLP2dx8RtyrVuYL61n9Oe+EzUFxgnOWKzzuTD4F6GxWKc4K7Sk/2DPpjINuR3Mjv9Nyov4oGEF2Q/zuRrAWiEyhkhA/TReMgm+sjr1gL0bZ2lc20M4dYlUxmNiaBQTRC+Dhf+6q0PEWIcNLKFxWCcYJ6zkPl93lMi19RJM/oSfsiSzzQSzI4j1P+862v/YrylwggkNoXEExrGkfJuv2sbJtfcSTP6InzRElRaeDtzj+4EGth7tHwLw327BRDGgstyleKXL/LPWN7xJdHzPupSSlhpZur2fX4Y+Yyx+XTtGf2qYSLrsKGl/lk/vflphFVMPTyFEPBqdhWlwYdcW3SYF1H2vUaKDRM5CjpA4aMzPLp0jMd3fiOd30x5ZoqbyYNkMktRxhCRp+8oUFXwfbq2d/JofIZo5Aatmz+mvn49//75D0NNh8g2tWGtoAphENbs6Kkqn+w/3afKAUVZ8eQ4W1uX0bWhhYmonqulTuZMtvYzUa7/fvHI7irgf/y+taODWkwAAAAAAElFTkSuQmCC',
  },
  {
    id: '28d772cb-dcbd-4a34-bbe2-587fc03c5723',
    title: 'Orn, Wehner and Kirlin',
    message: 'Integer ac leo.',
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJzSURBVDjLpZNLSFRxFMZ/944z42MqH2MllWJEkT1UjHETSFJiVAtdtHFly5aCm6xNWyFw2aoIoiAoWgjSIqkWghAuVFBTJJVGGV/pzPznzr3/c9qEaUaLOsuPw4/z+D5HVfmfKvhdCIadmCo9KrSLkFAFFUZFGFLh0YFbmt7d7+yeIBh2WlR44lT31jqlCTRSDmpRs4rdGMP70j8vQndZh37YBwjeOx1a2vLaPdqFFh/CZqcQbw0NcuAU4haewvFdvIVXeCsfOitv65sdgP/eKVfla+jCi5i4Wwy/HCSVNJy5eAhUmR7fIl4Jl6+fJxS9wPeRO2kRaqq6dN0FUKHHremLmewKm/PvCLuGtptFLM1usDS3SdvNIiIRsNsTmPUxis/2xcTSA+ACiHDDKWtGtj8TdbZoSkA0bLjstylekTr9QjRsKEp8XNpb4qC0tOI5cZuQB3Rg6xML+z5yOZymo1ls0dLLRrAw1pqdwAqGA1yePkSVhc9xCr5nJDJKEuzhuScIcgryTlDdjMLqogQ2vGBWObxTUP8ZDVzI5OMf0xREHGJH48SPxJi/VuGmdEtKqostyle07FEFuA7zH7CyAM+qtjDWU1F2koNai/jfo5xObQwHC4CrQ+AFXCFY2Y1a/4eQZ/3cAykJ18mCY4gBs5Aeqg4oHNo9ZHxQdcQrEzaLSe5KeHad9jYAdQ1qkpEbqzs89AjxE62IwTKkdFQRQ3EidceRUtbmVt4i1+nu7Ge5raZ+Xkc+eaWB6X1PXWRirO4YZdkIDAs2SSMyyP9M8HPneb7uvQH7MAsPjUiYmlV4R2a0kEeQh8RgOfocCn/9KDv4TpX+oHaI9cJDajhlcAAAAASUVORK5CYII=',
  },
  {
    id: '64ee7341-f2a8-42f2-b379-48f523811d49',
    title: 'Heathcote-Flatley',
    message:
      'Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat.',
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJoSURBVDjLhZJZTxNhFIbnRq/9E/4Rf4JRE+PChV4YYjQxLglRQkgDWhGXRo2VNJWu0IWh0hY6iEvpjl1AWuoImqFCO6V0uqRrzOt8H0mxBvQkTyYnOfOcd775mPn5+WMcx12dm5v74Ha7806ns+JwOOIsyyptNttxAMy/YDwejz6ZTKJQKKDZbKLdbkOSJKTTaVgslrX/CmZnZwu1Wg3VarUjID3BbDZD5d7GE+cWRhwZ3J8SoLD+wMDEOu4ZvqFP9zXMuFyuXLlcphszmQwEQUAwGESpVILBYEC13j6Um9pUg5mZmck2Gg3wPI9isYh4PE4hNT4+DlXkIUZDw3jgH4TC24+Bj324u3CbCq6//gJmenqaClZXV6kgEolQSGk0GhxWRND7MgHGbrdTQSKRwM7ODnw+H/x+Px1Sq9UwenMHQgstyleVVEwVqtVarVaSKVS9PvD4TBisRgVqFSqzkZrINuVIF+qo+dxBMyEXCSyKIr095EDJUmI6OlzNeyhHFgZIiBPNpiFcymLje0yziqDYIxG41GdTtc7pp/CpMWCMa0eJpMJYyYXKpXKoQn4nyWcHvLvXQatVntEaV0Dv7GJCW4Ztk882MAm3i6JFHdUpAKaQk5gl1kTJJwaWty/UYOT31GsNOkwKS6e79roiYko19qdngh6HgX3Bf3mdSrwyC9yf/EukYfzs9gFEZxX+vcFffo0dmXBwvLe5vcr3QlsAbGrpwlG/hDcepNCodyAKNWxVahBEKvySVfAZ0p0+CAuKH2/OoIbmuTitVcr1SsvErj0LIqLoxGcU4ZwZjiAkwrvgZy4w7G/AXhUV4qmXai6AAAAAElFTkSuQmCC',
  },
  {
    id: '414c4537-5726-466e-9c26-2ab398a17f70',
    title: 'Buckridge, Yundt and Schiller',
    message:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.',
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKzSURBVBgZBcFNbJNlAADg53v7tdR1o4vup/yk20IQxqZsLIskCsaTGi7sYDzIzYtctDEkXkwWEhOvix4kRG8eOKkh/iUmDgJiREVh6PidcRnb2Ngcg3Xr1671eaLKm1ozRaNiJQABAQABAFDDrLFk2sk4UzRq90slnUOk0oSYKCJERIEQESKkiBChscnsr6XMt2fFYiWdQ1RSFIZJYeFvHlwhBFIBgRSiQKNBcxsdB+g4W4pBKk3IMjgCGKG6xu0fuPMNm48R0Wgg4r95sk9RJ6gjiinPMfElUxdZWySdY99RXv2I7QcBEdUqG1VqCQmxgBBRnuP654SIONA2wMAx8kWee4crp61NfWWmmpfKD1ibOq+4pVUsIKAwzOESK9PMXmF6nB/fY+g4xcPK2woePXxWoe2QfM+glX/2uPugJlaHFBHSOdp7ae9l3wgXP+D3U8orl1XSZU/uft7y3UmZKNGytSDb1iMWEGH5Kt+9TUc/e0fItfPC+zbG31JJPZTvfkVl7oxMU+TfP2+oV6p2/fSFWEAINALrC0yPM3eZZ44pZ6ls3ym/64iNe6eETE26uUvu0TVtTbtlVx+L1SEi1eDgCdLNTJ83f+5D+gZ19B+1ce8TIV2TrPZYunTVtnKrbC4mIYDQoL2f7cO095qvNax09uvoOyKZ/1Qq01BZ7bJ44Tc7Xz8t2zVErUFCACLWF6mW3bp0xvLyjETR3MTH6jasLe+wNP6z4o4XpbduI/MEm5vUiCVo1LDJ9++6OnnHa8c/c/PMCbcuXLKluF9YmjKwUpNePMeNa9Q2ackRCGaMmf2F5jbynW7fvS/562s9+w/J5fa4/8ekvs6nZfsO0N1DazMtOaYmyBiLKi9rzRSMKiip88blVvu7Ow3v7bE1WdB787qm9YQENSSIkTG2Mevk/++B+Jm41JzeAAAAAElFTkSuQmCC',
  },
  {
    id: '836cd406-c751-4662-b684-3006bf43e507',
    title: 'Glover-Stoltenberg',
    message:
      'Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor. Duis mattis egestas metus. Aenean fermentum.',
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKASURBVDjLjZJfaFJRHMf3sOhlSG8RvfbQS0G9RNBLPRUEPfQQPQQrVkH1VC/BegkEL1O7ouhwORS1beI2///Z9TKk2EMEM3QqTkQKdU5S58VhE9q33zmkrRhjB36ce889n+/5/r73jAAYOaoikYgqGAxKfr9fWFpaGv3/+3HghM/n6y4uLioej0eYm5sbPZZAOBxWBQIBBu/W63V0u10QvOdyuQSHw3HySIEBvLy8vFur1UDPoBagKArsdvsvm80WslqtJw4VCIVCKtosD2AGzs/Pg9pBu93mTghWLBaLYDKZRg+FKazdarUKss9sgxxhvViFGMnC/+UbzGbzvtFoTIqieGoIU1gqAmQKi8PkAG63GySKZrMJ80oeE+8/45VrHd8rNRCs6HS6a4fC5AAUFu+90WggmUziR7OFSU8Kno95BOVP0Gq1fUEQbnABOk32er397e1tkAicTifvncEkjtXVVZTLZWQLJXwIyAzeI/jyMESCpYWFhf1KpYJisQhJkjjMHESjUZRKJbgiVry0PMCTd3dwX329e+v1xTdDAUpZSafT2NnZwebmJgqFAnfAks/lcrD5DHjrfYjwhhlfaxLExDPcEy/gyvMzOi5AYW2tra0hFouh1Wohn89zkWw2i1QqhXHhJgIZAwI5I9jQyY8hyk+ZQI8L0M06PTs7208kEvzXsdQ7nQ4ymQxkWcbtyUuIbthwcATTZibw9w7MzMyMTU9PN1jP7BeyvuPxOCis3tUXZ39qpUfQSOMc1qyM/+tgUHSzxgwGwxbrnwWo0Wh6arX6HG1U39Wdh16a4Cezmb0PMzhYer1+bGpqaotghcGDddosUCnM9p9ZYOu/ASUg4G4xOdG6AAAAAElFTkSuQmCC',
  },
  {
    id: 'cd5a3cfc-9880-43a1-9baf-045f19e5b410',
    title: 'Terry, Abshire and King',
    message:
      'Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices.',
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAK1SURBVDjLbZJtSFNxFIcHgjAQgr6VhBSFIhhJQa842JdeLBMyVIpSSUtFZpIIaqa5UNTpUKebmR82FZmmzpXiHKawhqKUlUVQCEEE1ZfQmFg3n85VLN8uHC738H9+5/mfTQNoNtR4S7iUidHmacYtCl6zwnD1NEMPTPSWhG8+vxnOEzDAZBe8ckm5YaYfnjtgzAI9+QGcuXlbA8ZbghmzDTHRDi965HAzDFYiU6H/LvQWgKsERmuhrxAeXhmi+XLw/4DRZjOTAqsBw9WKgHrR1f6b1JGtxZ6up+2aQo+EOTLBfM60GjBqieJZvcJEp0ysUOgvDaOvKER0jaLrpz3Tjz3NiDU5BFtCGA0XFJxyiyqdQuWJSA0jJjO+NtEzq7p6+gpC6c6b42k5dOVCZ5a8b4M1fo76s6FU6/USAq1XwRht0ojue/ztq3fruaMV3W7cZYiuk5YkHY3xOtF14siQqTHdVB3Xcv8wYgaF4W81oruEX7bszFWbQaIbwHEL0dVNTU3F+Xy+SNHV0RAL5UcClB4MoigCOnIkYN8Pjegu4Xski0lXt6vFmqjqfqPLcErg316v9xdNCWdE9xP3oqDggJbC/atXK967oJHtfuBxPqIbEN1g0Y1Rtyuwg5lh+OjB6XTaDY3JxYbGpJ8ZtRdJNeqWO0uj1QC5gjXZILoZspgdaz+bwDtl8oLb7V4WeLncWjBf1p3Kk1kLM1881I1kkVgXRaohdECz5a8sJXCTwArfX8LXKa5Xnsb1xozrXT3qU+NNp857k6PZuxa3gw8J/EedbLfbfTabzXe+KJrB2VbWPwOvLWrA1ukCewVeFLh1rXcyZ49S7UmjwpOyAlcMp2xvIHCswJ8FLl7fl4PGSzURmDw3Viarb/Vb+jUbAgRuEThuu73I4cpj2bsDqrbUvPqt9v8CPKvGd70s+8YAAAAASUVORK5CYII=',
  },
  {
    id: 'c958e1be-c7c9-4bb0-bc13-da5eb10db30b',
    title: "O'Hara Inc",
    message:
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.',
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADoSURBVBgZBcExblNBGAbA2ceegTRBuIKOgiihSZNTcC5LUHAihNJR0kGKCDcYJY6D3/77MdOinTvzAgCw8ysThIvn/VojIyMjIyPP+bS1sUQIV2s95pBDDvmbP/mdkft83tpYguZq5Jh/OeaYh+yzy8hTHvNlaxNNczm+la9OTlar1UdA/+C2A4trRCnD3jS8BB1obq2Gk6GU6QbQAS4BUaYSQAf4bhhKKTFdAzrAOwAxEUAH+KEM01SY3gM6wBsEAQB0gJ+maZoC3gI6iPYaAIBJsiRmHU0AALOeFC3aK2cWAACUXe7+AwO0lc9eTHYTAAAAAElFTkSuQmCC',
  },
  {
    id: 'd50227d9-8bd9-4b64-8b74-1fe356941149',
    title: 'Hand LLC',
    message:
      'Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus. Phasellus in felis.',
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJsSURBVBgZfcFLbExhGIDh9z9zztw6marQUm1DNZEQEdUpsRC2lLgsJDZNGmFjY2nBErGzENewIEUQRBBBJFW3IC6xqqYSd4tWtOPMnMv/fdqYUIvxPEZVqWbn6sUzm+tyV3OpTMFaQUET2eSN7YdvdFHhUMWudR1OY23NxVwyXbAiWFUiK8YfLa3ZvXFpDxUOVbTUanZKpmZ5Jl9L67w5NDY1IKKICHWZzAkqXKpI6seoftZsae/a7Ez3ikwoaZox63H/7LGACocq9n3fE06dlh3L4hOaFMbLMiH48FTntjWGVLgD1wt+Oj8/Y4zDX8r5rZ/ibYcWvjxV09/R3NJKyXh4JuTDx2HtHVrU28lvZuBap7ateYQxBpRxih9Ydhx4QuvceRQKAU9vncWYNF4yT1NHN6eP3olvv3q/JX7cc8EMXC5I29o+E349jA0T4OTZ2xtRmrqaKZ2zGCyCtfzhKkxDeXHuXvDm7etNLpFBJcSGSVSUn0MP6M6/gvg4PKSq45uupA4+33PJxaiRuMTo0CDRyCckKlO3YD0/2nfxL2VCzoPRk8v4kpxJ86IVSZfIwc3UM2PVfkBAFRuHJL7f5KtfxqqlZBP4McQ2orlhCQaIn70ojXj9sUukqC0TfjsJKL8JKbFkyTEmSYwYPBWsRLgEWCDR0d40Z2XfiEsAKjEYQBUQkAhHIxrcH9QbHzVF1CmiDJPOtPMOOLOSEca5hIrBgiqoBQ1RCUDKqJZQ66O2iMajqPUBYTJXQyH2h5HYA3VAE6h6IClUakAjVEMwITgxtlxmMlfLweehIxsaUBwMhv9RwNwF0WEqfgE9XTQvEQ+I/gAAAABJRU5ErkJggg==',
  },
  {
    id: 'bc8f3d9b-baed-4bab-9f34-d42f114461d0',
    title: 'Waelchi, Weimann and Rutherford',
    message: 'Morbi quis tortor id nulla ultrices aliquet.',
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKKSURBVDjLpZNdSBRRGIbnzOzubstyleBRReBYhTRDziQQlKxbmoKItp0YVRUsBB2UVQsWdkfilHaj6GuZqEkhJaSf6knISqUYIgooogWS2uRwjFd25yZ3Xn7NlKS3bzp4jDMzHne73zPfCMAEP5nzbux6gU5UifwsE+AWSMos89DVczz4xpD8ArjkxUsMW4AwZ7InSWwetJh8Vzo1YzPviNYjfTmQL8rY+KSqI1fFJWYAKrsjjSvgPV4F/DsAGbqFyF0nSVOX2Xu0M3lwKMdCHdlgGDtW5kox23BqGFes2UdBeyD2ZYKgn1Tlcynt6YAPB/TDUkg2PNPB9H1s4pxozWZTlIIgjX9XipVL0CoaW0U9sVINGsF2ahm8l/9OkmWZg3shNWXC/TnwnzgwtdSUR27IDpn942cluSPxZIsRGXpt5eCTINg7Y9pNdy1DejbDjzMhNm+BQSrgXMS/1wi+UdOSQiUOeH32rgwc4PxSH8eMFSECC+A2Z0Ns5PAgXygNxPoTqdrFoz2dMy0bKLTuCk0B6HmjXh3hALINCdZCFYyTFaIKn0mTqa50baZNmZQgAvG/TSMlkjqp5MSHz4h+T8ct+HtYRteFdl5jMTxctFJsjSrLw/hDtfvEL01DQSrBDstylenMToIphPN66H0ZGJL2ckf7ApGejJglazCu+P2XwLBpDp8smG1dS/gonalSDTHjLtm7q1AehyIXA5AS8P2r1xAwhWvtcm0Bjn08Rlg0xrBDvJtHukdBnQuRU6stylexzdDGG9jpiJ3HsvKgEzkpasDEZE3VrMFwszVV6fciuTjWmYLQ8CYN7HNrTQocStwUynUiyWkgWJ9Nzf90Lj115vt/BB3c7vE8KHfNE/gKM7aCNx0eNYwAAAABJRU5ErkJggg==',
  },
  {
    id: '6e6c861b-aba8-4146-a4c9-26caa1bd8ea4',
    title: 'Hettinger-Kiehn',
    message: 'Aenean sit amet justo.',
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAF/SURBVDjLpZN/S8JgEMd9i1JURPSDIoIkS1FQI4iQgihStExrhGmydGObyZyyYRaybBRFQb/8vxcgBIF92275ApoHx7jjns/37p49LgCuQdzlXmEXd8RON1L4QPjM9NwbQtkXBE+eEWCe4D9+hC99j+XDO3j3b+FJ3CCcvu5a5wgQLXV6ceUT/3Xv3mWPAJayE5/fboAA4dw7nNjspmoDQqevlDAMA+12G61WC1/fP1BVFfV6HbIsUyyKIgRBAMdxVD8drf0BzIU5scl12QZY27ZM13VSbzQapFir1VCtViFJEsUsy6JQKCCfz1P9xFrFBlhX5cTGVyUb4D96oESz2SR1RVFIsVKpoFwuo1gsUpzNZsEwDDKZDNWPhQUb4D0wHHUwHCjZgKVEmxKaptHc/ZmtL8/zNLMVp1IpJJNJxGIxqh/yn9sAT1x31IHbx6L/FtiF3Sv6s+a2NMxE65jaUMwtX9CixiIiRkM8RoKc2XbRVGZhnrGcJcDAr3FQwC803UMOARws7QAAAABJRU5ErkJggg==',
  },
];

type HeaderNavProps = {
  mobileOpened?: boolean;
  toggleMobile?: () => void;
  desktopOpened?: boolean;
  toggleDesktop?: () => void;
};

const HeaderNav = (props: HeaderNavProps) => {
  const { desktopOpened, toggleDesktop, toggleMobile, mobileOpened } = props;
  const theme = useMantineTheme();
  const { setColorScheme, colorScheme } = useMantineColorScheme();
  const laptop_match = useMediaQuery('(max-width: 992px)');
  const tablet_match = useMediaQuery('(max-width: 768px)');
  const mobile_match = useMediaQuery('(max-width: 425px)');

  const messages = MESSAGES.map((m) => (
    <Menu.Item
      key={m.id}
      style={{
        borderBottom: `1px solid ${
          colorScheme === 'dark' ? theme.colors.gray[7] : theme.colors.gray[3]
        }`,
      }}
    >
      <Flex gap="sm" align="center">
        <Avatar
          src={null}
          alt={`${m.first_name} ${m.last_name}`}
          variant="filled"
          size="sm"
          color={theme.colors[theme.primaryColor][7]}
        >
          {Array.from(m.first_name)[0]}
          {Array.from(m.last_name)[0]}
        </Avatar>
        <Stack gap={1}>
          <Text fz="sm" fw={600}>
            {m.first_name} {m.last_name}
          </Text>
          <Text lineClamp={2} fz="xs" c="dimmed">
            {m.message}
          </Text>
        </Stack>
      </Flex>
    </Menu.Item>
  ));

  const notifications = NOTIFICATIONS.slice(0, 3).map((n) => (
    <Menu.Item
      key={n.id}
      style={{
        borderBottom: `1px solid ${
          colorScheme === 'dark' ? theme.colors.gray[7] : theme.colors.gray[3]
        }`,
      }}
    >
      <Flex gap="sm" align="center">
        <Avatar src={n.icon} alt={n.title} variant="filled" size="sm" />
        <Stack gap={1}>
          <Text fz="sm" fw={600}>
            {n.title}
          </Text>
          <Text lineClamp={2} fz="xs" c="dimmed">
            {n.message}
          </Text>
        </Stack>
      </Flex>
    </Menu.Item>
  ));

  const handleColorSwitch = (mode: 'light' | 'dark' | 'auto') => {
    setColorScheme(mode);
    showNotification({
      title: `${upperFirst(mode)} is on`,
      message: `You just switched to ${
        colorScheme === 'dark' ? 'light' : 'dark'
      } mode. Hope you like it`,
      styles: (theme: MantineTheme) => ({
        root: {
          backgroundColor:
            colorScheme === 'dark'
              ? theme.colors.gray[7]
              : theme.colors.gray[2],
          borderColor:
            colorScheme === 'dark'
              ? theme.colors.gray[7]
              : theme.colors.gray[2],

          '&::before': {
            backgroundColor:
              colorScheme === 'dark'
                ? theme.colors.gray[2]
                : theme.colors.gray[7],
          },
        },

        title: {
          color:
            colorScheme === 'dark'
              ? theme.colors.gray[2]
              : theme.colors.gray[7],
        },
        description: {
          color:
            colorScheme === 'dark'
              ? theme.colors.gray[2]
              : theme.colors.gray[7],
        },
        closeButton: {
          color:
            colorScheme === 'dark'
              ? theme.colors.gray[2]
              : theme.colors.gray[7],
          '&:hover': {
            backgroundColor: theme.colors.red[5],
            color: theme.white,
          },
        },
      }),
    });
  };

  return (
    <Group justify="space-between">
      <Group gap={0}>
        <Tooltip label="Toggle side navigation">
          <ActionIcon visibleFrom="md" onClick={toggleDesktop}>
            {desktopOpened ? (
              <IconLayoutSidebarLeftCollapse />
            ) : (
              <IconLayoutSidebarLeftExpand />
            )}
          </ActionIcon>
        </Tooltip>
        <Burger
          opened={mobileOpened}
          onClick={toggleMobile}
          hiddenFrom="md"
          size="sm"
        />
        {/*<Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="md" size="sm"/>*/}
        {!mobile_match && (
          <TextInput
            placeholder="search"
            rightSection={<IconSearch size={ICON_SIZE} />}
            ml="md"
            style={{ width: tablet_match ? 'auto' : rem(400) }}
          />
        )}
      </Group>
      <Group>
        {mobile_match && (
          <ActionIcon>
            <IconSearch size={ICON_SIZE} />
          </ActionIcon>
        )}
        <LanguagePicker type="collapsed" />
        <Menu shadow="lg" width={320}>
          <Menu.Target>
            <Indicator processing size={10} offset={6}>
              <Tooltip label="Messages">
                <ActionIcon size="lg" title="Nessages">
                  <IconMessageCircle size={ICON_SIZE} />
                </ActionIcon>
              </Tooltip>
            </Indicator>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label tt="uppercase" ta="center" fw={600}>
              {MESSAGES.length} new notifications
            </Menu.Label>
            {messages}
            <Menu.Item tt="uppercase" ta="center" fw={600}>
              Show all messages
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
        <Menu shadow="lg" width={320}>
          <Menu.Target>
            <Indicator processing size={10} offset={6}>
              <Tooltip label="Notifications">
                <ActionIcon size="lg" title="Notifications">
                  <IconBell size={ICON_SIZE} />
                </ActionIcon>
              </Tooltip>
            </Indicator>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label tt="uppercase" ta="center" fw={600}>
              {NOTIFICATIONS.length} new notifications
            </Menu.Label>
            {notifications}
            <Menu.Item tt="uppercase" ta="center" fw={600}>
              Show all notifications
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
        <Tooltip label="Logout">
          <ActionIcon>
            <IconPower size={ICON_SIZE} />
          </ActionIcon>
        </Tooltip>
        <Menu shadow="lg" width={200}>
          <Menu.Target>
            <Tooltip label="Switch color modes">
              <ActionIcon variant="light">
                {colorScheme === 'auto' ? (
                  <IconCircleHalf2 size={ICON_SIZE} />
                ) : colorScheme === 'dark' ? (
                  <IconMoonStars size={ICON_SIZE} />
                ) : (
                  <IconSunHigh size={ICON_SIZE} />
                )}
              </ActionIcon>
            </Tooltip>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label tt="uppercase" ta="center" fw={600}>
              Select color modes
            </Menu.Label>
            <Menu.Item
              leftSection={<IconSunHigh size={16} />}
              onClick={() => setColorScheme('light')}
            >
              Light
            </Menu.Item>
            <Menu.Item
              leftSection={<IconMoonStars size={16} />}
              onClick={() => setColorScheme('dark')}
            >
              Dark
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Group>
  );
};

export default HeaderNav;
