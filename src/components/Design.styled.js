import styled from "styled-components"

// Navbar Components
export const Logo = styled.span`
color: white;
padding-right: 60px;
font-weight:bold;
font-size:25px;
`;

export const Nav = styled.div`
display: flex;
justify-content: space-between;
`

export const Navlink = styled.a.attrs({
className:"navbar-link hidden sm:hidden md:inline lg:inline xl:inline 2xl:inline"
})`
color: #b0acbb;
font-size: 15px;
padding-right: 30px;
&:hover {
    color:#5c378f;
  }

`;

export const NavButtom = styled.button`
background-color: white;
border-radius: 100px;
padding: 8px;
padding-left: 20px;
padding-right: 20px;
color: black
`
// Navbar Components


// ChildNavbar Components

export const BottomLink = styled.a`
        color: #b0acbb;
        font-size: 13px;
        padding-right: 10px;
        cursor:pointer;
    `


//Main Component

export const Container = styled.div.attrs({
    className:"pt-8"
})``


export const TextSpan = styled.span`
color: #766E82;
font-size: 13px;
`
export const TextH2 = styled.h2.attrs({
    className:"text-white text-2xl font-bold"
})``

export const TextButton = styled.button.attrs({
    className:"inline mt-3"
})`
background-color: white;
border-radius: 100px;
padding: 5px;
padding-left: 20px;
padding-right: 20px;
color: #000;
`

export const InnerCard = styled.div.attrs({
    className:"w-50 h-300 rounded-3xl border ml-3 mr-3"
})`
    clip-path: polygon(9% 0, 92% 0, 100% 9%, 100% 92%, 92% 100%, 9% 100%, 0 92%, 0 9%);
    background-color: #201631;
    margin-bottom: 20px;
    border: 2px solid transparent;
    &:hover {
        border: 2px solid #A479DC;
      }
`

export const Unstake = styled.div`
    padding: 10px;
    width: 100%;
    text-align: center;
    border-bottom-left-radius: 10px;
    cursor:pointer;
    &:hover {
        background-color: #162739;
        color: #2fdada;
      }
`
export const Collect = styled.div`
    padding: 10px;
    cursor:pointer;
    width: 100%;
    text-align: center;
    border-bottom-right-radius: 10px;
    color: #2fdada;
    &:hover {
        background-color: #162739;
        color: #2fdada;
      }
`

export const InnerCardSpan = styled.span`
color: #766E82;
font-size: 12px;
`
export const Line = styled.div`
margin-top: 5px;
margin-bottom: 5px;
width:${({percent})=>percent}%;
height:3px;
background:  #74707C;
border-radius: 100px;
border: none;
`








    
    


