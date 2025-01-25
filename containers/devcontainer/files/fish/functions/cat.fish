function cat --description 'cat but bat'
    if test (count $argv) -gt 0
        if type -q bat
            bat --theme Dracula --paging=never --style plain $argv
        else
            cat $argv
        end
    end
end
