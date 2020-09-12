call plug#begin('~/.vim/plugged')
Plug 'mattn/emmet-vim'
Plug 'preservim/nerdtree'
Plug 'pangloss/vim-javascript'
Plug 'Valloric/YouCompleteMe'
call plug#end()

filetype indent on
syntax on
set encoding=utf-8
set number 
set colorcolumn=90
set laststatus=1
set relativenumber
set ruler
set nocompatible 
set softtabstop=2
set tabstop=2
set history=1000
set noswapfile
set nobackup
set hidden
set autoindent
set shiftwidth=2
set guifont=Consolas:h12

"au GUIEnter * simalt ~x
filetype indent plugin on

set backspace=indent,eol,start " backspace always works on insert mode

"ONLY CSS AND HTML EMMET
let g:user_emmet_install_global = 0
autocmd FileType html,css EmmetInstall
let g:user_emmet_leader_key=','
"EMMET 



autocmd BufNewFile,BufRead *.json set ft=javascript
nnoremap <C-n> :NERDTree<CR>
nnoremap <Up>    :resize +2<CR>
nnoremap <Down>  :resize -2<CR>
nnoremap <Left>  :vertical resize +2<CR>
nnoremap <Right> :vertical resize -2<CR>

".vimrc
map <c-f> :call JsBeautify()<cr>
" or
autocmd FileType javascript noremap <buffer>  <c-f> :call JsBeautify()<cr>
" for json
autocmd FileType json noremap <buffer> <c-f> :call JsonBeautify()<cr>
" for jsx
autocmd FileType jsx noremap <buffer> <c-f> :call JsxBeautify()<cr>
" for html
autocmd FileType html noremap <buffer> <c-f> :call HtmlBeautify()<cr>
" for css or scss
autocmd FileType css noremap <buffer> <c-f> :call CSSBeautify()<cr>
